import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [imageRef, setImageRef] = useState(null);
  //   const [imageURL, setImageURL] = useState(null);
  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const resetForm = () => {
    setFile(null);
    setText("");
    setImageRef(null);
  };
  const loadFile = async (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    let url = "";
    try {
      if (file) {
        const result = await uploadBytes(imageRef, file);
        url = await getDownloadURL(result.ref);
      }
      const postData = {
        authorId: uid,
        text,
        imageURL: url || "",
        postedAt: Timestamp.fromDate(new Date()),
      };
      await addDoc(collection(db, "events"), postData);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (file) {
      console.log(file);
      setImageRef(ref(storage, `images/${file.name}`));
    }
  }, [file]);

  return (
    <form action="post">
      <div>CreatePost</div>
      <label htmlFor="postText">
        <input
          type="text"
          name="postText"
          id="post-text"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={text}
        />
      </label>
      <label htmlFor="loadFile">
        <input type="file" accept="image/*" onChange={loadFile} />
      </label>
      <button type="button" onClick={handleSubmit}>
        Post
      </button>
    </form>
  );
}

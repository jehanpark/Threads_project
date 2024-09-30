// @ts-nocheck
import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../Components/Common/Button"
import {CameraIcon,PictureIcon,MicIcon,HashtagIcon} from "../Components/Common/Icon"

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  width: 680px;
  gap: 10px;
`;

const TextArea = styled.textarea`
  background: #fff;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 20px;
  font-size: 16px;
  margin: 0 auto;
  width: 620px;
  height: 250px;
  resize: none;
  &::placeholder {
    opacity: 1;
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
    border-color: #1d9bf9;
  }
`;

const Icons = styled.div`
display: flex;
margin: 20px 0;
margin-left: 20px;
gap:20px;

`;

const Buttons = styled.div`
display: flex;
justify-content: center;
margin: 0 auto;
gap: 20px;
`;

const AttachFileButton = styled.label`
  width: 100%;
  color: #1d9bf9;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #1d9bf9;
  border-radius: 20px;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    border: 1px solid transparent;
    background: #1d9bf9;
    color: #fff;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background: #fff;
  color: #1d9bf9;
  border: none;
  border-radius: 20px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const maxFileSize = 5 * 1024 * 1024;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > maxFileSize) {
        alert("The Maximum Capacity that can be uploaded is 5MB");
        return;
      }
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === "" || post.length > 180) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "contents"), {
        post,
        createdAt: Date.now(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `contents/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        const fileType = file.type;
        if (fileType.startsWith("image/")) {
          await updateDoc(doc, {
            photo: url,
          });
        }
        if (fileType.startsWith("video/")) {
          await updateDoc(doc, {
            video: url,
          });
        }
      }
      setPost("");
      setFile(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        onChange={onChange}
        value={post}
        name="contents"
        id="contents"
        placeholder="내용을 작성하세요.."
        required
      ></TextArea>
      <Icons>
        <CameraIcon width={50} />
        <PictureIcon width={36} />
        <MicIcon width={36}/>
        <HashtagIcon width={36}/>
      </Icons>
      <div></div>
      <Buttons>
        <Button text="팔로워에게만 허용" type="bigupload"/>
        <Button text="스레드 업로드" type="bigupload"/>
      </Buttons>
      <AttachFileButton htmlFor="file">
        {file ? "Content Added✅" : "Add 💨"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="video/*, image/*"
      />
      {/* <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post"} /> */}
    </Form>
  );
};

export default PostForm;

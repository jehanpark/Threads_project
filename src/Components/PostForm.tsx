// @ts-nocheck
import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../Components/Common/Button";
import {
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
} from "../Components/Common/Icon";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 680px;
  gap: 10px;
  background: #fff;
  border-radius: 20px;
`;

const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
`;

const TextArea = styled.textarea`
  background: #fff;
  color: #000;
  border: 2px solid #fff;
  border-left: 1px solid #bababa;
  padding: 20px;
  padding-left: 10px;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 40px;
  width: 600px;
  height: 200px;
  resize: none;
  &::placeholder {
    color: #bababa;
    opacity: 1;
    font-size: 16px;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
  }
`;

const Icons = styled.div`
  display: flex;
  margin: 20px 0;
  margin-left: 20px;
  gap: 20px;
`;

const CameraButton = styled.label`
  cursor: pointer;
`;
const CameraInput = styled.input`
  display: none;
`;

const PictureButton = styled.label`
  cursor: pointer;
`;
const PictureInput = styled.input`
  display: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 20px;
  border-top: 1px solid #ddd;
  padding: 20px;
`;

const SubmitBtn = styled.input`
  width: 300px;
  height: 80px;
  background: #1c1c1c;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-radius: 30px;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #1c1c1c;
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
    console.log(e);
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
      <PlusImage>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Preview"
            style={{ width: "180px", height: "auto", borderRadius: "10px" }}
          />
        )}
      </PlusImage>
      <Icons>
        <CameraButton htmlFor="camera">
          <CameraIcon width={50} />
          <CameraInput
            onChange={onFileChange}
            id="camera"
            type="file"
            accept="video/*, image/*"
          />
        </CameraButton>
        <PictureButton htmlFor="picture">
          <PictureIcon width={36} />
        </PictureButton>
        <PictureInput
          onChange={onFileChange}
          id="picture"
          type="file"
          accept="video/*, image/*"
        />
        <MicIcon width={36} />
        <HashtagIcon width={36} />
      </Icons>
      <Buttons>
        <Button text="팔로워에게만 허용" type="bigupload" />
        <SubmitBtn
          text="스레드 업로드"
          type="submit"
          value={isLoading ? "Posting..." : "Post"}
        />
      </Buttons>
    </Form>
  );
};

export default PostForm;

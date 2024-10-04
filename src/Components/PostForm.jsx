// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../Components/Common/Button";
import {
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
} from "../Components/Common/Icon";

// Styled Components
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
  gap: 10px;
`;

const TextArea = styled.textarea`
  background: #fff;
  color: #000;
  border: 2px solid #fff;
  border-left: 1px solid #bababa;
  padding: 20px 10px;
  font-size: 16px;
  margin: 40px auto 0;
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
  margin: 20px 0 0 20px;
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

const DelteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
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
  const [files, setFiles] = useState([]);

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) => {
        if (file.size > maxFileSize) {
          alert("The maximum file size is 5MB.");
          return false;
        }
        return true;
      });

      if (files.length + newFiles.length > maxFilesCount) {
        alert(`You can upload a maximum of ${maxFilesCount} files.`);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === "" || post.length > 180) return;

    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "contents"), {
        post,
        createdAt: Date.now(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
      });

      const photoUrls = [];
      const videoUrls = [];

      await Promise.all(
        files.map(async (file) => {
          const locationRef = ref(
            storage,
            `contents/${user.uid}/${docRef.id}/${file.name}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);

          if (file.type.startsWith("image/")) {
            photoUrls.push(url);
          } else if (file.type.startsWith("video/")) {
            videoUrls.push(url);
          }
        })
      );

      await updateDoc(docRef, {
        photos: photoUrls,
        videos: videoUrls,
      });

      setPost("");
      setFiles([]); // Clear files after upload
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        onChange={handlePostChange}
        value={post}
        name="contents"
        id="contents"
        placeholder="내용을 작성하세요.."
        required
      />
      <PlusImage>
        {files.map((file, index) => (
          <div key={index} style={{ position: "relative", margin: "5px" }}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded Preview ${index + 1}`}
              style={{
                width: "180px",
                height: "240px",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
            <DeleteButton onClick={() => removeFile(index)}>X</DeleteButton>
          </div>
        ))}
      </PlusImage>
      <Icons>
        <CameraButton htmlFor="camera">
          <CameraIcon width={50} />
          <CameraInput
            onChange={handleFileChange}
            id="camera"
            type="file"
            accept="video/*, image/*"
          />
        </CameraButton>
        <PictureButton htmlFor="picture">
          <PictureIcon width={36} />
        </PictureButton>
        <PictureInput
          onChange={handleFileChange}
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
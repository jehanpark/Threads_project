// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../Components/Common/Button";
import GlobalStyles from "../styles/GlobalStyles.styles";
import Border from "./Common/Border";
import {
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
} from "../Components/Common/Icon";

// Styled Components
const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  width: 680px;
  height: 800px;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: absolute;
    height: calc(100% - 68px);
    border-radius: 0;
    width: 100%;
    bottom: 0px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const Form = styled.form`
  position: absolute;
  left: 50%;
  height: 50%;
  bottom: 0;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 660px;
  height: 790px;
  gap: 10px;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px 30px 0 0;
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 0 0 0;
  }
`;

const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
`;

const TextArea = styled.textarea`
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  padding: 20px;
  padding-left: 10px;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 40px;
  width: 600px;
  height: 600px;
  resize: none;
  font-family: var(--pretendard-font);
  font-weight: 300;
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
  @media screen and (width: 390px){
    border-radius: 0 0 0 0;
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
  fill: none;
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
  border-top: ${(props) => props.theme.borderstroke};
  padding: 20px;
  @media screen and (width: 390px) {
   display: flex;
   width: 100%; 
  }
`;

const DelteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #d6d6d6;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  @media screen and (width: 390px) {
   display: none;
  }
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
  @media screen and (width: 390px) {
   
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
    <BoederWrapper>
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
            <CameraIcon width={38} />
            <CameraInput
              onChange={handleFileChange}
              id="camera"
              type="file"
              accept="video/*, image/*"
            />
          </CameraButton>
          <PictureButton htmlFor="picture">
            <PictureIcon width={24} />
          </PictureButton>
          <PictureInput
            onChange={handleFileChange}
            id="picture"
            type="file"
            accept="video/*, image/*"
          />
          <MicIcon width={24} />
          <HashtagIcon width={24} />
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
    </BoederWrapper>
  );
};

export default PostForm;

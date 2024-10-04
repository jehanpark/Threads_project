// @ts-nocheck
import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import GlobalStyles from "../styles/GlobalStyles.styles";
import Button from "../Components/Common/Button";
import {
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
} from "../Components/Common/Icon";

const BoederWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  margin: 0 auto;
  width: 680px;
  height: 800px;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: absolute;
    top:70px;
    height: calc(100% - 140px);
    border-radius: 0;
    width: 100%;
    box-shadow: none;
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
  const [files, setFiles] = useState<File[]>([]);

  const maxFileSize = 5 * 1024 * 1024;
  const maxFilesCount = 3;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) => {
        if (file.size > maxFileSize) {
          alert(
            "The Maximum Capacity that can be uploaded is 5MB for each file"
          );
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

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === "" || post.length > 180) return;
    try {
      setIsLoading(true);
      // Firestore에 기본적인 문서를 추가합니다.
      const doc = await addDoc(collection(db, "contents"), {
        post,
        createdAt: Date.now(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
      });
      // 사진이나 비디오 URL들을 저장할 배열
      const photoUrls: string[] = [];
      const videoUrls: string[] = [];
      // 각 파일을 업로드하고 URL을 가져옵니다.
      await Promise.all(
        files.map(async (file) => {
          const locationRef = ref(
            storage,
            `contents/${user.uid}/${doc.id}/${file.name}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          // 파일 타입에 따라 배열에 URL을 추가합니다.
          const fileType = file.type;
          if (fileType.startsWith("image/")) {
            photoUrls.push(url);
          }
          if (fileType.startsWith("video/")) {
            videoUrls.push(url);
          }
        })
      );
      // Firestore 문서에 사진 및 비디오 URL 배열을 저장합니다.
      await updateDoc(doc, {
        photos: photoUrls,
        videos: videoUrls,
      });
      setPost("");
      setFiles([]); // 업로드 후 파일 초기화
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <BoederWrapper>
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
          {files.map((file, index) => (
            <div key={index} style={{ position: "relative", margin: "5px" }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded Preview ${index + 1}`}
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  background: "none"
                  
                }}
              />
              <DelteButton onClick={() => removeFile(index)}>X</DelteButton>
            </div>
          ))}
        </PlusImage>
        <Icons>
          <CameraButton htmlFor="camera">
            <CameraIcon width={34} />
            <CameraInput
              onChange={onFileChange}
              id="camera"
              type="file"
              accept="video/*, image/*"
            />
          </CameraButton>
          <PictureButton htmlFor="picture">
            <PictureIcon width={24} />
          </PictureButton>
          <PictureInput
            onChange={onFileChange}
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

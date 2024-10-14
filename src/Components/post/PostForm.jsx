// @ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../Common/Button";
import GlobalStyles from "../../styles/GlobalStyles.styles";
import Border from "../Common/Border_de";
import { useNavigate } from "react-router-dom";

import { CameraIcon, PictureIcon, MicIcon, HashtagIcon } from "../Common/Icon";
import Modal from "../Common/Modal";
import PostForm_Modal from "./PostForm_Modal";
import Loading from "../LoadingLogo/Loading";
import { useAuth } from "../../Contexts/AuthContext";

// Styled Components

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
`;
const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  width: 660px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 100px);
    bottom: 70px;
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
  width: 660px;
  height: 100%;
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
  @media screen and (width: 390px) {
    border-radius: 0 0 0 0;
  }
`;

const Icons = styled.div`
  display: flex;
  margin: 20px 0;
  margin-left: 20px;
  gap: 20px;
  @media (max-width: 768px) {
    margin: 0;
    margin-left: 20px;
  }
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
  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const OpenButton = styled.button`
  width: 300px;
  height: 80px;
  background: #d6d6d6;
  border: none;
  color: #000;
  font-size: 15px;
  font-weight: bold;
  border-radius: 30px;
  transition: all 0.3s;
  &:hover {
    background: #eaeaea;
    color: #494949;
  }
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  const [files, setFiles] = useState([]);

  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/login"); // "예"를 누르면 로그인 페이지로 이동
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

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

    // 랜덤으로 아이콘 값 생성
    const randomLikes = Math.floor(Math.random() * 100);
    const randomComments = Math.floor(Math.random() * 10);
    const randomDms = Math.floor(Math.random() * 50);
    const randomRetweets = Math.floor(Math.random() * 5);

    try {
      setIsLoading(true);

      // Firebase에 포스트 기본 정보 저장
      const docRef = await addDoc(collection(db, "contents"), {
        post,
        createdAt: serverTimestamp(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
        email: user.email,
        likes: randomLikes,
        comments: randomComments,
        dms: randomDms,
        retweets: randomRetweets, // 랜덤 아이콘 값 저장
      });

      const photoUrls = [];
      const videoUrls = [];

      // 파일이 있을 경우 업로드
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

      // 파일 업로드가 완료된 후 Firebase에 사진/비디오 URL 업데이트
      await updateDoc(docRef, {
        photos: photoUrls,
        videos: videoUrls,
      });

      // 제출 후 상태 초기화
      setPost("");
      setFiles([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <BoederWrapper>
        <Form onSubmit={handleSubmit}>
          {isLoading ? <Loading /> : null}
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
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Preview ${index + 1}`}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "10px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <video
                    controls
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={URL.createObjectURL(file)} />
                  </video>
                )}
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
            <OpenButton>팔로워에게만 허용</OpenButton>
            <SubmitBtn
              text="스레드 업로드"
              type="submit"
              value={isLoading ? "Posting..." : "Post"}
            />
          </Buttons>
        </Form>
      </BoederWrapper>
    </Wrapper>
  );
};

export default PostForm;

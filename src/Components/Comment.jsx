import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  Coment,
  CameraIcon,
  PictureIcon,
  MicIcon,
  HashtagIcon,
} from "../Components/Common/Icon";
import { useAuth } from "../Contexts/AuthContext";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "./Common/Button";
import Loading from "./Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const PostWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px;
  padding: 20px;
  width: 660px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
`;
const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const Timer = styled.span`
  flex: 1;
  font-size: 10px;
  color: #9a9a9a;
`;
const Posted = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 12px;
  gap: 10px;
`;

const Photo = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover/contain;
  margin-left: 0px;
  border-radius: 8px;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;
const Video = styled.video`
  display: flex;
  width: 220px;
  height: 160px;
  border-radius: 15px;
  object-fit: cover;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: start;
  align-items: center;
  margin-left: 50px;
  margin-top: 10px;
  cursor: pointer;
  color: #bababa;
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
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 660px;
  height: calc(100% - 10px);
  gap: 10px;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px 30px 0 0;
  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 0 0 0;
  }
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
const Comment = () => {
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [comments, setComments] = useState(Math.floor(Math.random() * 10));
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [retweets, setRetweets] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const location = useLocation();

  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴

  const { postContent, photos, videos, username, createdAt } =
    location.state || {};

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  const handlePostChange = (e) => {
    setPost(e.target.value);
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

      const commentData = {
        comment: post,
        createdAt: serverTimestamp(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
        photoUrls: [], // 이미지를 저장할 배열
        videoUrls: [], // 비디오를 저장할 배열
      };

      // Firestore에서 해당 포스트 문서 참조 가져오기
      const commentsRef = collection(
        db,
        "contents",
        location.state.postId,
        "comments"
      );

      // 파일이 있을 경우 업로드 처리
      const photoUrls = [];
      const videoUrls = [];

      if (files.length > 0) {
        await Promise.all(
          files.map(async (file) => {
            const storageRef = ref(
              storage,
              `comments/${user.uid}/${file.name}`
            );
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 파일이 이미지면 photoUrls에 저장
            if (file.type.startsWith("image/")) {
              photoUrls.push(downloadURL);
            }
            // 파일이 비디오면 videoUrls에 저장
            if (file.type.startsWith("video/")) {
              videoUrls.push(downloadURL);
            }
          })
        );

        // 업로드된 파일의 URL을 댓글 데이터에 추가
        commentData.photoUrls = photoUrls;
        commentData.videoUrls = videoUrls;
      }

      // 댓글 데이터를 해당 포스트의 comments 하위 컬렉션에 추가
      await addDoc(commentsRef, commentData);

      // 상태 초기화
      setPost("");
      setFiles([]);
    } catch (error) {
      console.error("Error adding comment: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;

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
  return (
    <Wrapper>
      <PostWrapper>
        <Header>
          <UserImage src="http://localhost:5173/profile.png"></UserImage>
          <Username>{username}</Username>
          <Timer>{renderTimeAgo()}</Timer>
        </Header>
        <Column>
          <Posted>{postContent}</Posted>
        </Column>

        <ColumnWrapper>
          <Column>
            {photos &&
              photos.length > 0 &&
              photos.map((photoUrl, index) => (
                <Photo
                  key={index}
                  src={photoUrl}
                  alt={`Post Image ${index + 1}`}
                />
              ))}
          </Column>

          <Column>
            {videos &&
              videos.length > 0 &&
              videos.map((videoUrl, index) => (
                <Video key={index} controls autoPlay loop src={videoUrl} />
              ))}
          </Column>
        </ColumnWrapper>

        <Icons>
          <IconWrapper>
            <HeartIcon width={20} /> {likes}
          </IconWrapper>
          <IconWrapper>
            <Coment width={20} /> {comments}
          </IconWrapper>
          <IconWrapper>
            <DmIcon width={18} /> {dms}
          </IconWrapper>
          <IconWrapper>
            <RetweetIcon width={20} /> {retweets}
          </IconWrapper>
        </Icons>
      </PostWrapper>

      <Form onSubmit={handleSubmit}>
        {isLoading ? <Loading /> : null}
        <TextArea
          onChange={handlePostChange}
          value={post}
          name="contents"
          id="contents"
          placeholder="댓글을 작성하세요.."
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
                    objectFit: "cover",
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
          <SubmitBtn
            text="댓글달기"
            type="submit"
            value={isLoading ? "댓글다는중..." : "댓글달기"}
          />
        </Buttons>
      </Form>
    </Wrapper>
  );
};

export default Comment;

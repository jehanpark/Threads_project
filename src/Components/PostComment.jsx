import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  Coment,
} from "../Components/Common/Icon";

const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 140px);
    bottom: 70px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const PostWrapper = styled.div`
  margin: 10px auto 10px;
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
    height: auto;
    margin: 6px;
    padding: 20px;
    gap: 5px;
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PostComment = ({ id }) => {
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [comments, setComments] = useState(Math.floor(Math.random() * 10));
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [retweets, setRetweets] = useState(2);
  const [files, setFiles] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const { postContent, photos, videos, username, createdAt } =
    location.state || {};

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleCommentClick = () => {
    navigate("/Comment", {
      state: {
        postId: id,
        postContent: post,
        photos,
        videos,
        username,
        createdAt: createdAt || { seconds: Date.now() / 1000 }, // 기본값 설정
      },
    });
  };

  return (
    <BoederWrapper>
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
          <IconWrapper onClick={handleCommentClick}>
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
    </BoederWrapper>
  );
};

export default PostComment;

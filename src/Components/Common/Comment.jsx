import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, DmIcon, RetweetIcon, Coment } from "../Common/Icon";

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
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const CommentWrapper = styled.div`
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
const Comment = () => {
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [comments, setComments] = useState(Math.floor(Math.random() * 10));
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [retweets, setRetweets] = useState(2);
  const location = useLocation();
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
      <CommentWrapper>
        <TextArea
          onChange={handlePostChange}
          value={post}
          name="contents"
          id="contents"
          placeholder="내용을 작성하세요.."
          required
        />
      </CommentWrapper>
    </Wrapper>
  );
};

export default Comment;

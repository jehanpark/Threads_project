import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;
const Posted = styled.div``;
const CommentWrite = styled.div``;
const Photo = styled.img``; // 사진 스타일링
const Video = styled.video``; // 비디오 스타일링
const Username = styled.span``; // 사용자 이름 스타일링
const Timer = styled.span``; // 타이머 스타일링

const Comment = () => {
  const location = useLocation();
  const { postContent, photos, videos, username, createdAt } =
    location.state || {};

  return (
    <Wrapper>
      <Posted>{postContent}</Posted>
      <Username>{username}</Username>
      <Timer>{new Date(createdAt.seconds * 1000).toLocaleString()}</Timer>{" "}
      {/* 시간 포맷 */}
      {/* Render photos */}
      {photos &&
        photos.length > 0 &&
        photos.map((photoUrl, index) => (
          <Photo key={index} src={photoUrl} alt={`Post Image ${index + 1}`} />
        ))}
      {/* Render videos */}
      {videos &&
        videos.length > 0 &&
        videos.map((videoUrl, index) => (
          <Video key={index} controls autoPlay loop src={videoUrl} />
        ))}
      <CommentWrite>댓글을 작성하세요...</CommentWrite>
      {/* 댓글 입력 및 목록 컴포넌트 추가 가능 */}
    </Wrapper>
  );
};

export default Comment;

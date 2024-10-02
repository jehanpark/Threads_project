import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const PostListContainer = styled.div`
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: scroll;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostUserName = styled.h4`
  margin: 0;
  font-size: 1.2rem;
`;

const PostTime = styled.p`
  margin: 0;
  color: #888;
`;

const PostContent = styled.div`
  margin: 10px 0;
`;

const PostText = styled.p`
  font-size: 1rem;
`;

const PostImages = styled.div`
  display: flex;
  gap: 10px;
`;

const PostImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const PostLink = styled.a`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const PostHeart = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

const PostBookmark = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

// PostList 컴포넌트
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // public 폴더에 있는 threads.json 파일을 fetch로 불러오기
    fetch("/threads.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("데이터를 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <PostListContainer>
      {posts.length === 0 ? (
        <p>게시글을 불러오는 중입니다...</p>
      ) : (
        posts.map((post) => (
          <PostItem key={post.threadId}>
            <PostHeader>
              <ProfileImg src={post.threadUserImg} alt={`${post.threadUserName}의 프로필`} />
              <PostInfo>
                <PostUserName>{post.threadUserName}</PostUserName>
                <PostTime>{post.threadTime}</PostTime>
              </PostInfo>
            </PostHeader>
            <PostContent>
              <PostText>{post.threadContents.text}</PostText>
              {post.threadContents.images.length > 0 && (
                <PostImages>
                  {post.threadContents.images.map((image, index) => (
                    <PostImage key={index} src={image} alt={`post-image-${index}`} />
                  ))}
                </PostImages>
              )}
            </PostContent>
            <PostFooter>
              <PostHeart>❤️ {post.threadHeart}</PostHeart>
              {post.threadBookMark ? <PostBookmark>🔖 북마크됨</PostBookmark> : <PostBookmark>북마크 안됨</PostBookmark>}
              <PostLink href={post.threadShareLink}>게시글 보기</PostLink>
            </PostFooter>
          </PostItem>
        ))
      )}
    </PostListContainer>
  );
};

export default PostList;

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import Post from "../Post";
import { Thread100Icon } from "../Common/Icon";

const Container = styled.div`
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
  overflow: hidden;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 70px);
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const PostlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 20px 20px 0 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  transition: transform 0.3s;
  &.bounce {
    animation: bounce-back 1s ease-in;
  }
  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(20px); /* 살짝 위로 올렸다가 */
    }
    100% {
      transform: translateY(0px); /* 원래 자리로 돌아오기 */
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius:0;
  }
`;
const Logo = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  justify-content: center;
  top: -50px;
  &.bounce {
    animation: bounce-back 1s ease-in-out;
  }
`;

const TimeLine = () => {
  const [posts, setPosts] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let unsubscribe = null;
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "contents"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, photos, videos, post, userId, username, email } =
            doc.data();

          return {
            id: doc.id,
            createdAt,
            photos: photos || [],
            videos: videos || [],
            post,
            userId,
            username,
            email,
          };
        });
        setPosts(posts);
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const handleScroll = () => {
    const element = wrapperRef.current;
    // 스크롤이 가장 위에 도달했는지 확인
    if (element.scrollTop === 0) {
      // 텐션감을 위한 애니메이션 트리거
      setIsBouncing(true);

      // 0.5초 후에 애니메이션 클래스 제거
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  // console.log(posts);

  return (
<Container>
        <PostlistWrapper
          ref={wrapperRef}
          className={isBouncing ? "bounce" : ""}
          onScroll={handleScroll}
        >
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </PostlistWrapper>
</Container>
  );
};

export default TimeLine;

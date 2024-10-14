import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import Post from "../Post";
import styled from "styled-components";

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
  transition: transform 0.3s ease-out;
  &.bounce {
    animation: bounce-back 1s ease-in-out;
  }
  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(40px); /* 살짝 위로 올렸다가 */
    }
    100% {
      transform: translateY(0px); /* 원래 자리로 돌아오기 */
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin-top: 6px;
    padding: 0 5px;
    gap: 5px;
  }
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
  background: ${(props) => props.theme.btnBgColor};
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

const TimeLine = ({ searchTerm, contentType, onDataEmpty }) => {
  const [posts, setPosts] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let unsubscribe = null;

    const fetchPosts = async () => {
      let postsQuery = query(
        collection(db, "contents"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      // 실시간 데이터 구독 설정
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const livePosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filteredPosts = livePosts;

        // 검색어 필터링
        if (searchTerm && searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          filteredPosts = livePosts.filter((item) => {
            const usernameMatch =
              item.username &&
              item.username.toLowerCase().includes(searchLower);
            const emailMatch =
              item.email && item.email.toLowerCase().includes(searchLower);
            const userInfoMatch =
              item.userInfo &&
              item.userInfo.toLowerCase().includes(searchLower);
            const postMatch =
              item.post && item.post.toLowerCase().includes(searchLower);

            return usernameMatch || emailMatch || userInfoMatch || postMatch;
          });
        }

        //  필터링
        if (contentType === "picture") {
          filteredPosts = filteredPosts.filter(
            (post) => post.photos && post.photos.length > 0
          );
        } else if (contentType === "video") {
          filteredPosts = filteredPosts.filter(
            (post) => post.videos && post.videos.length > 0
          );
        } else if (contentType === "both") {
          filteredPosts = filteredPosts.filter(
            (post) =>
              post.photos &&
              post.photos.length > 0 &&
              post.videos &&
              post.videos.length > 0
          );
        }

        setPosts(filteredPosts);

        // 데이터가 없을 때 처리
        if (onDataEmpty) onDataEmpty(filteredPosts.length === 0);
      });
    };

    fetchPosts();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [searchTerm, contentType]);

  const handleScroll = () => {
    const element = wrapperRef.current;
    if (element.scrollTop === 0) {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  return (
    <BoederWrapper>
      <PostlistWrapper
        ref={wrapperRef}
        className={isBouncing ? "bounce" : ""}
        onScroll={handleScroll}
      >
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </PostlistWrapper>
    </BoederWrapper>
  );
};

export default TimeLine;

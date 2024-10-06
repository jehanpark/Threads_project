import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Post from "./Post";

// export interface IPost {
//   id: string;
//   createdAt: number;
//   photo?: string[];
//   video?: string;
//   post: string;
//   userId: string;
//   username: string;
// }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding: 0 10px;
`;

const TimeLine = () => {
  const [posts, setPosts] = useState([]);

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
          const { createdAt, photos, video, post, userId, username } =
            doc.data();
          return {
            id: doc.id,
            createdAt,
            photos: photos || [],
            video,
            post,
            userId,
            username,
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

  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
};

export default TimeLine;

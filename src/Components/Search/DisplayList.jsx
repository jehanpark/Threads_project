import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Display from "./Display"; // 개별 포스트 컴포넌트

const DisplayList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contents"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts: ", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Display
          key={post.id}
          id={post.id}
          post={post.post}
          photos={post.photos}
          video={post.video}
          username={post.username}
          userId={post.userId}
        />
      ))}
    </div>
  );
};

export default DisplayList;

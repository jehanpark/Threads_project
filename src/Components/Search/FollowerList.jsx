import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import FollowerItem from "./FollowerItem"; // FollowerItem 컴포넌트는 따로 정의되어 있다고 가정

const ErrorInfo = styled.p`
  margin-top: 30px;
`;

const FollowersList = () => {
  const [followersData, setFollowersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore에서 데이터 가져오기

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFollowersData(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time data: ", error);
        setLoading(false);
      }
    );

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  // 팔로우 상태 변경 함수
  const toggleFollow = async (followerId, isFollowing) => {
    const updatedFollowers = followersData.map((follower) =>
      follower.id === followerId
        ? { ...follower, isFollowing: !isFollowing }
        : follower
    );
    setFollowersData(updatedFollowers);

    try {
      const userRef = doc(db, "users", followerId); // Firestore의 "users" 컬렉션 참조
      await updateDoc(userRef, { isFollowing: !isFollowing });
    } catch (error) {
      console.error("Error updating follow status: ", error);
    }
  };

  if (loading) {
    return <ErrorInfo>팔로워 데이터를 불러오는 중...</ErrorInfo>;
  }

  return (
    <div>
      {followersData.length > 0 ? (
        followersData.map((follower) => (
          <FollowerItem
            key={follower.id}
            nickname={follower.username}
            profileImg={follower.profileImg}
            desc={follower.bio}
            followers={follower.followers}
            isFollowing={follower.isFollowing}
            toggleFollow={() => toggleFollow(follower.id, follower.isFollowing)}
          />
        ))
      ) : (
        <ErrorInfo>팔로워 데이터를 찾을 수 없습니다.</ErrorInfo>
      )}
    </div>
  );
};

export default FollowersList;

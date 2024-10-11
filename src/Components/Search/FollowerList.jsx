import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import FollowerItem from "./FollowerItem";

const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [filteredFollowers, setFilteredFollowers] = useState([]);

  // Firestore에서 필터링된 팔로워 데이터 가져오기
  useEffect(() => {
    let followersQuery = collection(db, "users");

    if (contentType === "profile") {
      followersQuery = query(followersQuery, where("profile", "==", true));
    }

    if (searchTerm && searchTerm.trim() !== "") {
      followersQuery = query(
        followersQuery,
        where("username", ">=", searchTerm.toLowerCase()),
        where("username", "<=", searchTerm.toLowerCase() + "\uf8ff")
      );
    }
    // 실시간으로 데이터 구독
    const unsubscribeFollowers = onSnapshot(followersQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredFollowers(data);
      onDataEmpty(data.length === 0); // 데이터가 없을 때 상태 알림
    });

    // 구독 해제
    return () => {
      unsubscribeFollowers();
    };
  }, [searchTerm, contentType, onDataEmpty]);

  // 팔로우 상태를 변경하는 함수
  const handleToggleFollow = (id) => {
    setFilteredFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower.id === id
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  return (
    <div>
      {filteredFollowers.map((follower) => (
        <FollowerItem
          key={follower.id}
          follower={follower}
          toggleFollow={() => handleToggleFollow(follower.id)}
        />
      ))}
    </div>
  );
};

export default FollowersList;

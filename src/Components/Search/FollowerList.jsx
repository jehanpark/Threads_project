import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import FollowerItem from "./FollowerItem";
const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailAdress = searchParams.get("email");
  useEffect(() => {
    let unsubscribe = null;
    const fetchFollowers = async () => {
      let followersQuery = query(collection(db, "profile"));
      // 이메일 주소가 있는 경우 해당 이메일로 필터링
      if (emailAdress) {
        followersQuery = query(
          followersQuery,
          where("userEmail", "==", emailAdress)
        );
      }
      // 실시간 데이터 구독 설정
      unsubscribe = onSnapshot(followersQuery, (snapshot) => {
        let liveFollowers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // 검색어 필터링
        if (searchTerm && searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          liveFollowers = liveFollowers.filter((item) => {
            const usernameMatch =
              item.username &&
              item.username.toLowerCase().includes(searchLower);
            const emailMatch =
              item.userEmail &&
              item.userEmail.toLowerCase().includes(searchLower);
            const bioMatch =
              item.bio && item.bio.toLowerCase().includes(searchLower);
            return usernameMatch || emailMatch || bioMatch;
          });
        }
        // 콘텐츠 타입 필터링 (프로필에 맞는 필터링 추가)
        if (contentType === "profile") {
          liveFollowers = liveFollowers.filter(
            (item) => item.isProfilePublic === true
          );
        }
        setFollowers(liveFollowers);
        if (onDataEmpty) onDataEmpty(liveFollowers.length === 0); // 데이터가 없는 경우 처리
      });
    };
    fetchFollowers();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [searchTerm, contentType, emailAdress, onDataEmpty]);
  const handleScroll = () => {
    const element = wrapperRef.current;
    if (element.scrollTop === 0) {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };
  const handleProfileClick = (email) => {
    if (email) {
      navigate({
        pathname: "/profile",
        search: `${createSearchParams({
          email: email,
        })}`,
      });
    }
  };
  const handleToggleFollow = async (id, currentStatus) => {
    try {
      const followerRef = doc(db, "profile", id);
      const updatedStatus = !currentStatus;
      await updateDoc(followerRef, { isFollowing: updatedStatus });
      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.id === id
            ? { ...follower, isFollowing: updatedStatus }
            : follower
        )
      );
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  return (
    <div>
      {followers.map((follower) => (
        <FollowerItem
          key={follower.id}
          follower={follower}
          toggleFollow={() =>
            handleToggleFollow(follower.id, follower.isFollowing)
          }
          onProfileClick={() => handleProfileClick(follower.userEmail)}
        />
      ))}
    </div>
  );
};
export default FollowersList;

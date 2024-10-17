import { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import FollowerItem from "./FollowerItem";

const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailAdress = searchParams.get("email");
  const auth = getAuth();
  const currentUser = auth.currentUser; // 로그인 정보

  useEffect(() => {
    let unsubscribe = null; //메모리누수방지
    const fetchFollowers = async () => {
      let followersQuery = query(collection(db, "profile"));

      //  이메일 필터링
      // if (emailAdress) {
      //   followersQuery = query(
      //     followersQuery,
      //     where("userEmail", "==", emailAdress)
      //   );
      // }

      // 실시간 데이터 구독 설정
      unsubscribe = onSnapshot(followersQuery, (snapshot) => {
        let liveFollowers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // 현재 모든 데이터를 가져와서 필터링

        // 로그인 회원 정보와 이메일 정보 동일

        if (currentUser && currentUser.email) {
          liveFollowers = liveFollowers.filter(
            (follower) => follower.userEmail !== currentUser.email
          );
        }

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

  //프로필페이지 이동

  const handleProfileClick = (email) => {
    console.log(emailAdress);
    if (email) {
      navigate({
        pathname: "/profile",
        search: `${createSearchParams({
          email: email,
        })}`,
      });
    }
  };

  //팔로우
  const handleToggleFollow = async (id, currentStatus) => {
    try {
      const followerRef = doc(db, "profile", id);
      const updatedStatus = !currentStatus;

      //클릭전환
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

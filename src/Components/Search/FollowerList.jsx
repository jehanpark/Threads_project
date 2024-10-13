import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import FollowerItem from "./FollowerItem";

const FollowersList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailAdress = searchParams.get("email");

  // Firestore에서 데이터를 가져오는 함수

  const fetchPosts = async () => {
    let postsQuery = query(
      collection(db, "contents"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    // 이메일 주소가 있는 경우 해당 이메일만 필터링
    if (emailAdress) {
      postsQuery = query(postsQuery, where("email", "==", emailAdress));
    }

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 클라이언트에서 필터링
      // 1. 검색어 필터링
      if (searchTerm && searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase();
        data = data.filter((item) => {
          const usernameMatch =
            item.username && item.username.toLowerCase().includes(searchLower);
          const emailMatch =
            item.email && item.email.toLowerCase().includes(searchLower);
          const userInfoMatch =
            item.userInfo && item.userInfo.toLowerCase().includes(searchLower);
          return usernameMatch || emailMatch || userInfoMatch;
        });
      }

      if (contentType === "profile") {
        data = data.filter((item) => item.profile === true);
      } else if (contentType === "all") {
      }

      setFollowers(data);
      onDataEmpty && onDataEmpty(data.length === 0);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchPosts();
  }, [searchTerm, contentType, emailAdress]);

  // 팔로워 아이템 클릭 시 프로필 페이지로 이동
  const handleProfileClick = (email) => {
    if (email) {
      navigate(`/profile/${email}`);
    }
  };
  return (
    <div>
      {followers.map((follower) => (
        <FollowerItem
          key={follower.id}
          follower={follower}
          onClick={() => handleProfileClick(follower.email)}
        />
      ))}
    </div>
  );
};

export default FollowersList;

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import Displayitem from "./Displayitem";

const DisplayList = ({ searchTerm, contentType, onDataEmpty }) => {
  const [filteredDisplays, setFilteredDisplays] = useState([]);

  // Firestore에서 데이터 가져오기
  useEffect(() => {
    let displaysQuery = collection(db, "contents");

    // 검색어가 있을 경우 쿼리에 검색어 조건 추가
    if (searchTerm) {
      displaysQuery = query(
        displaysQuery,
        where("post", ">=", searchTerm.toLowerCase()),
        where("post", "<=", searchTerm.toLowerCase() + "\uf8ff")
      );
    }

    // contentType에 따라 필터 적용
    if (contentType === "recent") {
      displaysQuery = query(displaysQuery, orderBy("createdAt", "desc"));
    } else if (contentType === "picture") {
      displaysQuery = query(displaysQuery, where("picture", ">", ""));
    } else if (contentType === "video") {
      displaysQuery = query(displaysQuery, where("videos", ">", ""));
    }

    //실시간 업데이트
    const unsubscribeDisplay = onSnapshot(displaysQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredDisplays(data);
      onDataEmpty(data.length === 0);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeDisplay();
    };
  }, [searchTerm, contentType, onDataEmpty]);

  return (
    <div>
      {filteredDisplays.map((display) => (
        <Displayitem key={display.id} display={display} />
      ))}
    </div>
  );
};

export default DisplayList;

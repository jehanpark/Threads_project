import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import NotificationItem from "./NotificationItem";

// 최대 알림 개수
const MAX_NOTIFICATIONS = 10;

// 알림 메시지 템플릿
const messages = [
  "님이 회원님의 게시글에 좋아요를 눌렀습니다.",
  "님이 회원님의 답글에 좋아요를 눌렀습니다.",
  "님이 회원님의 답글에 답변을 달았습니다.",
  "님이 회원님의 게시글에 답변을 달았습니다.",
  "님이 게시글에 회원님을 언급하였습니다.",
  "님이 게시글에 회원님의 게시글을 인용하였습니다.",
];

// 메시지를 기반으로 타입 추론 함수
const getTypeLabel = (message) => {
  if (message.includes("좋아요")) {
    return "like";
  } else if (message.includes("답글")) {
    return "comment";
  } else if (message.includes("언급") || message.includes("인용")) {
    return "comment";
  } else if (message.includes("친한친구")) {
    return "friend";
  } else {
    return "other";
  }
};

const NotificationList = ({ onUpdate }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        // 데이터 가져오기 로그 (한 번만 출력)
        console.log(
          `Firestore에서 데이터를 가져옴: 총 ${querySnapshot.size} 개`
        );

        const initialData = querySnapshot.docs.map((docSnapshot) => {
          const docData = docSnapshot.data();
          const createdAt = docData.createdAt?.toDate() || new Date();
          const message =
            docData.message ||
            messages[Math.floor(Math.random() * messages.length)];

          // getTypeLabel
          const type = getTypeLabel(message);

          return {
            id: docSnapshot.id,
            username: docData.username || "익명",
            createdAt,
            isRead: false,
            message,
            type,
          };
        });

        // 가져온 데이터를 최대 알림 개수까지 제한
        const limitedData = initialData.slice(0, MAX_NOTIFICATIONS);
        setNotifications(limitedData);

        // 부모 컴포넌트로 전달 (필요한 경우에만)
        if (typeof onUpdate === "function") {
          onUpdate(limitedData);
        }
      } catch (error) {
        console.error("Firestore에서 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    // fetchData 호출
    fetchData();

    // 의존성 배열을 비워서 한 번만 실행되도록 함
  }, []); // 빈 배열로 의존성을 설정하여 컴포넌트 마운트 시 한 번만 실행

  // 알림 읽음 처리 함수
  const markAsRead = async (id) => {
    // 알림의 상태를 업데이트
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );

    try {
      const notificationRef = doc(db, "users", id);
      await updateDoc(notificationRef, { isRead: true });
    } catch (error) {
      console.error("Firestore 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClick={() => markAsRead(notification.id)}
        />
      ))}
    </>
  );
};

export default NotificationList;

import React, { useState, useEffect } from "react";
// import Border from "../Components/Common/Border";
import styled from "styled-components";
import NotificationItem from "../Components/Activity/NotificationItem";
import NotificationList from "../Components/Activity/Notificationlist";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-top: 40px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontcolor};
  transition: all 0.3s;
  @media (max-width: 768px) {
    margin-top: 30px;
    font-size: 22px;
    margin-bottom: 15px;
  }
  @media (max-width: 480px) {
    margin-top: 30px;
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  max-width: 680px;
  height: 600px;
  border-radius: 40px 40px 0px 0px;
  background-color: ${(props) => props.theme.borderColor};
  @media (max-width: 768px) {
    width: 90%;
    border-radius: 20px 20px 0px 0px;
  }
  @media (max-width: 480px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
  }
  button {
    flex: 0 0 auto;
    width: 130px;
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: all;
    @media (max-width: 768px) {
      width: 90px;
      padding: 8px 15px;
    }
    @media (max-width: 480px) {
      width: 80px;
      padding: 6px 10px;
    }
  }
`;

const ContentsBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 0;
  }

  @media (max-width: 480px) {
    padding: 0;
  }
`;

const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background-color: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 140px);
    bottom: 70px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 20px;
`;

const Activity = () => {
  const [savedData, setSavedData] = useState([]); // 모든 데이터를 저장
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 저장
  const [contentType, setContentType] = useState("all"); // 선택된 필터 상태

  // NotificationList에서 데이터를 받아옴
  const handleDataUpdate = (listData) => {
    if (listData.length > 0) {
      setSavedData(listData); // 전체 데이터를 저장
      setFilteredData(listData); // 필터링 없이 모든 데이터를 먼저 보여줌
    }
  };

  // 알림 읽음 표시
  const markAsRead = (id) => {
    const updatedData = savedData.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    setSavedData(updatedData);
    setFilteredData(updatedData);
  };

  //알람 밀어서 삭제

  // 필터링
  const filterList = (type) => {
    if (type === "all") {
      setFilteredData(savedData);
    } else {
      const filtered = savedData.filter((item) => item.type === type); // 타입에 따른 필터링
      setFilteredData(filtered);
    }
  };

  // 버튼 클릭 시 필터링 적용
  const handleButtonClick = (type) => {
    setContentType(type); // 필터 상태 업데이트
    filterList(type); // 필터링 적용
  };

  // 버튼 스타일 동적 적용
  const getButtonStyle = (type, isNightMode) => ({
    background: "transparent",
    color:
      contentType === type
        ? isNightMode
          ? "#FFF"
          : "#000"
        : isNightMode
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(204, 204, 204, 0.8)",
    borderBottom:
      contentType === type
        ? `1.5px solid ${isNightMode ? "#fff" : "#000"}`
        : "none",
  });

  const buttons = [
    { label: "모두", type: "all" },
    { label: "좋아요", type: "like" },
    { label: "답글", type: "comment" },
    { label: "친한친구", type: "friend" },
  ];

  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/login"); // "예"를 누르면 로그인 페이지로 이동
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  return (
    <BoederWrapper>
      <Contain>
        <MenuTitle>활동</MenuTitle>
        <Border>
          <ButtonGroup>
            {buttons.map((button) => (
              <button
                key={button.type}
                style={getButtonStyle(button.type)}
                onClick={() => handleButtonClick(button.type)}
              >
                {button.label}
              </button>
            ))}
          </ButtonGroup>

          <ContentsBorder>
            {filteredData.length > 0 ? (
              filteredData.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  {...notification}
                  onClick={() => markAsRead(notification.id)}
                />
              ))
            ) : (
              <NoResults>알림 내역이 없습니다.</NoResults>
            )}

            {savedData.length === 0 && (
              <NotificationList onUpdate={handleDataUpdate} />
            )}
          </ContentsBorder>
        </Border>
      </Contain>
    </BoederWrapper>
  );
};

export default Activity;

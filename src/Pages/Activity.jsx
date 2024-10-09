import React, { useState } from "react";
import styled from "styled-components";
import NotificationItem from "../Components/Activity/NotificationItem";
import NotificationList from "../Components/Activity/Notificationlist";

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
  background: ${(props) => props.theme.borderWrapper};
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
  margin-bottom: 40px;
  @media (max-width: 768px) {
    gap: 10px;
    padding: 0 40px;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    padding: 0 40px;
  }
  button {
    flex: 0 0 auto;
    width: 130px;
    border-radius: 8px;
    padding: 10px 20px;
    background: ${(props) => props.theme.buttonbackground};
    border: 1px solid ${(props) => props.theme.searchButton};
    color: ${(props) => props.theme.buttonText};
    font-weight: 700;
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
  background: ${(props) => props.theme.borderWrapper};
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

  const handleDataUpdate = (listData) => {
    if (listData.length > 0) {
      setSavedData(listData);
      setFilteredData(listData);
    }
  };

  // 필터링 함수
  const filterList = (type) => {
    if (type === "all") {
      setFilteredData(savedData);
    } else {
      const filtered = savedData.filter((item) => item.type === type);
      setFilteredData(filtered);
    }
  };

  // 버튼 클릭 시 필터링 적용
  const handleButtonClick = (type) => {
    setContentType(type); // 필터 상태 업데이트
    filterList(type); // 필터링 적용
  };

  // 버튼 스타일 동적 적용
  const getButtonStyle = (type) => ({
    backgroundColor: contentType === type ? "#000" : "#fff",
    color: contentType === type ? "#fff" : "#000",
  });

  const buttons = [
    { label: "모두", type: "all" },
    { label: "좋아요", type: "like" },
    { label: "답글", type: "comment" },
    { label: "친한친구", type: "friend" },
  ];

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
                <NotificationItem key={notification.id} {...notification} />
              ))
            ) : (
              <NoResults>알림 내역이 없습니다.</NoResults>
            )}

            <NotificationList onUpdate={handleDataUpdate} />
          </ContentsBorder>
        </Border>
      </Contain>
    </BoederWrapper>
  );
};

export default Activity;

// src/components/MentionModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { LeftArrowIcon } from "./Icon";

// 스타일 정의
export const Overlay = styled.div`
  position: fixed; // 모달을 화면에 고정
  top: 45%; // 세로 중앙 정렬 기준
  left: 50%; // 가로 중앙 정렬 기준
  transform: translate(-50%, -50%); // 요소의 중심을 기준으로 이동
  width: 100vw; // 전체 화면 너비
  height: 100vh; // 전체 화면 높이
  display: flex; // 플렉스 박스 사용
  justify-content: center; // 수평 중앙 정렬
  align-items: center; // 수직 중앙 정렬
  z-index: 1000; // 다른 요소보다 위에 표시 (필요 시 조정)
  background-color: rgba(0, 0, 0, 0.7); // 반투명 배경 (필요 시 조정)
`;

export const ModalContainer = styled.div`
  width: 420px;
  height: 620px;
  background-color: ${(props) => props.theme.borderColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  padding: 24px;
`;

export const Title = styled.h2`
  margin-left: 90px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "")};
`;

const SubTitle = styled.h3`
  margin-top: 16px;
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${(props) => props.theme.modalfont};
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "14px")};
  font-weight: 500;
  margin-bottom: 12px;
`;

export const Info = styled.div`
  color: ${(props) => props.theme.modalfont};
  font-size: 12px;
  font-weight: normal;
  background: ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  line-height: 20px;
  padding: 12px;
`;

const Button = styled.button`
  padding: 16px; /* 인풋 창과 같은 높이로 설정 */
  background: #181818;
  color: #dfdfdf;
  border: 1px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s; /* 호버 애니메이션 부여 */
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    color: #fff;
    border: 1px solid #fff;
  }
  &:focus {
    color: #fff;
    border: 1px solid #fff;
  }
`;
const DelButton = styled.button`
  padding: 16px; /* 인풋 창과 같은 높이로 설정 */
  background: ${(props) => props.theme.modalfont};
  color: #fff;
  border: 1px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s; /* 호버 애니메이션 부여 */
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    color: #181818;
    border: 1px solid #fff;
  }
  &:focus {
    color: #181818;
    border: 1px solid #fff;
  }
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  box-sizing: border-box;
  border: none;
  cursor: pointer;

  color: gray; // 초기 색상 설정
  transition: color 0.3s ease; // 색상 전환 효과

  &:hover,
  &:active {
    color: #181818; // 호버 또는 클릭 시 색상 변경
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeactivateModal = ({ onClose, onSelectOption }) => {
  const [activeOption, setActiveOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setIsOptionSelected(true);
    onSelectOption(option); // 부모 컴포넌트에 선택된 옵션 전달
    onClose(); // 모달 닫기
  };

  // 모달 외부 클릭 시 닫히는 함수
  const handleOverlayClick = () => {
    if (isOptionSelected) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <TitleLayout>
          <BackButton onClick={onClose}>
            <LeftArrowIcon size={32} />
          </BackButton>
          <Title>비활성화 또는 삭제</Title>
        </TitleLayout>
        <SubTitle>프로필 비활성화는 일시적입니다. </SubTitle>
        <Info>
          다시 로그인하여 프로필을 재활성화할 때까지 Threads 프로필, 콘텐츠,
          좋아요, 팔로워가 숨겨집니다.
        </Info>
        <SubTitle>프로필 삭제는 영구적입니다. </SubTitle>
        <Info>
          Threads 프로필, 콘텐츠, 좋아요, 팔로워가 숨겨지며 30일 후에 영구적으로
          삭제됩니다.
        </Info>
        <SubTitle>Threads 프로필에만 적용됩니다. </SubTitle>
        <Info>
          회원님의 Instagram 계정(@frontendd_d)은 삭제되거나 비활성화되지
          않습니다.
        </Info>
        <ButtonLayout>
          <Button>프로필 비활성화</Button>
          <DelButton>프로필 삭제</DelButton>
        </ButtonLayout>
      </ModalContainer>
    </Overlay>
  );
};

export default DeactivateModal;

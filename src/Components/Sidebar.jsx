import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContext } from "../Contexts/ThemeContext";

const Aside = styled.aside`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const SetBtn = styled.button`
  width: 80px;
  height: 80px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border: 2px solid ${(props) => props.theme.borderstroke};
  /* border-color: ${(props) => props.theme.borderstroke};
  border-style: none;
  border-width: 1px; */
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
`;

const PinBtn = styled.button`
  width: 80px;
  height: 80px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border: 2px solid ${(props) => props.theme.borderstroke};

  /* border-color: ${(props) => props.theme.borderstroke};
  border-style: none; */
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
`;

// 왼쪽에서 오른쪽으로 슬라이드 인
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-15%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 오른쪽에서 왼쪽으로 슬라이드 인
const slideInFromRight = keyframes`
  from {
    transform: translateX(-5%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// shouldForwardProp으로 isThemeModal 필터링
// shouldForwardProp으로 isThemeModal과 isBackClick을 필터링하여 DOM 전달 방지
const ModalContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "isThemeModal" && prop !== "isBackClick",
})`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 10px;
  width: 258px;

  height: 298px;

  background-color: ${(props) => props.theme.borderColor};
  color: ${({ theme }) => theme.textColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* color: ${(props) => props.theme.fontcolor}; */

  height: ${(props) => (props.isThemeModal ? "220px" : "298px")};
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};

  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  z-index: 100;
  animation: ${(props) =>
      props.isThemeModal && !props.isBackClick
        ? slideInFromRight
        : slideInFromLeft}
    0.2s ease forwards;
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Li = styled.li`
  width: 218px;
  height: 57px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: background 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.mouseHoverBg};
    color: ${({ theme }) => theme.mouseHoverFontcolor};
    font-weight: 700;
  }
`;

const Icon = styled.i`
  display: inline-block;
  width: 6px;
  height: 11px;
  border: 1px solid skyblue;
`;

// ThemeToggleButton에서 isDarkMode 필터링
const ThemeToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isDarkMode", // isDarkMode를 DOM에 전달하지 않음
})`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => (props.isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  border: 1px solid #ccc;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  cursor: pointer;
`;

const Sidebar = () => {
  const { toggleTheme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBackClick, setIsBackClick] = useState(false); // 뒤로 가기 애니메이션 상태
  const modalRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
    setIsThemeModalOpen(false);
    setIsBackClick(false); // 모달이 열릴 때는 기본 상태로 초기화
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsThemeModalOpen(false);
  };

  const handleBackClick = () => {
    setIsBackClick(true); // 뒤로 가기 슬라이드 인 적용
    setTimeout(() => {
      setIsThemeModalOpen(false); // 테마 모달 닫고 기본 모달로 복귀
    }, 0); // 즉시 테마 모달 닫기
  };

  const handleThemeModalOpen = () => {
    setIsBackClick(false); // 테마 모달로 가는 슬라이드 인 설정
    setIsThemeModalOpen(true); // 테마 모달 열기
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const ModalLists = ["디자인", "인사이트", "설정", "문제신고", "로그아웃"];

  return (
    <Aside>
      <BtnWrapper>
        <PinBtn>PIN</PinBtn>
        <SetBtn onClick={openModal}>SET</SetBtn>
      </BtnWrapper>

      {isOpen && !isThemeModalOpen && (
        <ModalContainer ref={modalRef} isThemeModal={false}>
          <Ul>
            {ModalLists.map((ModalList, index) => (
              <Li
                key={index}
                onClick={() => {
                  if (index === 0) {
                    handleThemeModalOpen(); // 첫 번째 메뉴 클릭 시 테마 모달로 전환
                  } else {
                    closeModal();
                  }
                }}
              >
                {ModalList}
                {index === 0 && <Icon />}
              </Li>
            ))}
          </Ul>
        </ModalContainer>
      )}

      {/* 테마 변경 모달 */}
      {isThemeModalOpen && (
        <ModalContainer
          ref={modalRef}
          isThemeModal={true}
          isBackClick={isBackClick} // 뒤로 가기 애니메이션 구분
        >
          <BackButton onClick={handleBackClick}>{"< 뒤로 가기"}</BackButton>
          <p>모드 변경</p>
          <ThemeToggleButton isDarkMode={isDarkMode} onClick={toggleTheme}>
            {isDarkMode ? "모드 변경" : "모드 변경"}
          </ThemeToggleButton>
        </ModalContainer>
      )}
    </Aside>
  );
};

export default Sidebar;

import React, { useState } from "react";
import styled from "styled-components";

const Aside = styled.aside`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// setting Button
const SetBtn = styled.button`
  width: 80px;
  height: 80px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border-color: ${(props) => props.theme.bordercolor};
  border-style: none;
  border-radius: 50%;
  cursor: pointer;
`;
const PinBtn = styled.button`
  width: 80px;
  height: 80px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border-color: ${(props) => props.theme.bordercolor};
  border-style: none;
  border-radius: 50%;
  cursor: pointer;
`;

// 모달 창 스타일
const ModalContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 10px;
  width: 258px;
  height: 298px;
  /* border-color: ${(props) => props.theme.bordercolor}; */
	background-color: ${(props) => props.theme.borderColor};
  color: ${({ theme }) => theme.textColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* color: ${(props) => props.theme.fontcolor}; */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  z-index: 100; /* 다른 콘텐츠 위에 뜨도록 설정 */
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid skyblue; */
`;

const Li = styled.li`
  width: 218px;
  height: 57px;
  padding-left: 20px;
  padding-right: 20px;
  /* border: 1px solid skyblue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: background 0.4s;
  &:hover {
    background-color:${({ theme }) => theme.mouseHoverBg};
    color:${({ theme }) => theme.mouseHoverFontcolor};
    font-weight: 700;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Icon = styled.i`
  display: inline-block;
  width: 6px;
  height: 11px;
  border: 1px solid skyblue;

  /* background-image: url("/right-arrow.png"); */
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalToggle = () => {
    console.log("hi");
  };
  const ModalLists = ["디자인", "인사이트", "설정", "문제신고", "로그아웃"];

  return (
    <Aside>
      <BtnWrapper>
        <PinBtn>PIN</PinBtn>
        <SetBtn onClick={modalToggle}>SET</SetBtn>
      </BtnWrapper>
      <ModalContainer>
        <Ul>
          {ModalLists.map((ModalList, index) => (
            <Li key={index}>
              {/* 첫번째 항목에 아이콘 추가 */}
              {ModalList}
              {index === 0 && <Icon></Icon>}
            </Li>
          ))}
        </Ul>
      </ModalContainer>
    </Aside>
  );
};

export default Sidebar;

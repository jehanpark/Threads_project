import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 화면 위에 나오도록 */
`;

const ModalContainer = styled.div`
  width: 450px;
  height: 471px;
  border-radius: 12px;
  background: #545454;
  padding: 20px;
  color: white;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {/* 모달 내부 내용 */}
        <h2>Threads</h2>
        <p>쓰레드 팀 프로젝트 화이팅!</p>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

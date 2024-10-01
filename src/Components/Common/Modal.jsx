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
  height: ${(props) => props.height || "471px"};
  border-radius: 12px;
  background: #fff;
  padding: 64px 11px 0 11px;
  color: #000;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, children, height }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {/* 모달 내부 내용 */}
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

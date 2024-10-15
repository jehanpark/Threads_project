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
  z-index: 999;
`;

const ModalWrapper = styled.div`
  width: 400px;
  height: 200px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000; /* z-index를 충분히 높게 설정 */
`;

const ExModal = ({ post, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <h3>수정 모달</h3>
        <p>{post}</p>
        <button onClick={onCancel}>닫기</button>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ExModal;

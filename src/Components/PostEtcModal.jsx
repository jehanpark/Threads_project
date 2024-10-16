import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 16px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export default function PostEtcModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ul>
          <li>저장</li>
          <li>프로필에 고정</li>
          <li>좋아요 수 및 공유 수 숨기기</li>
          <li>답글을 남기고 인용할 수 있는 사람</li>
          <li>삭제</li>
          <li>링크 복사</li>
        </ul>
      </ModalContainer>
    </>
  );
}

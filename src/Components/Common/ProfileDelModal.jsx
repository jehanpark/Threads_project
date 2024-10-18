// src/components/DeactivateSuccessModal.jsx
import React from "react";
import styled from "styled-components";
import { auth } from "../../firebase";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #181818;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #333;
  }
`;
const ProfileDelModal = () => {
  const handleLogoutAndRedirect = () => {
    // 로그아웃 처리와 동시에 로그인 페이지로 이동
    auth.signOut(); // Firebase 인증 로그아웃 예시
    window.location.href = "/login"; // 로그인 페이지로 리디렉션
  };

  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>계정을 완전히 삭제하였습니다.</Title>
        <Button
          onClick={handleLogoutAndRedirect} // 확인 클릭 시 홈으로 이동
        >
          확인
        </Button>
      </ModalContainer>
    </Overlay>
  );
};

export default ProfileDelModal;

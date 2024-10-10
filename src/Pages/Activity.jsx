import React, { useEffect } from "react";
import Border from "../Components/Common/Border_de";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 39px;
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 25px;
`;

const Activity = () => {
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
    <Contain>
      <MenuTitle>활동</MenuTitle>
      <Border type="borderWrapper"></Border>
    </Contain>
  );
};

export default Activity;

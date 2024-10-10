import React from "react";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles.styles";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  UserIcon1,
  Like,
  Home,
  GoBack,
} from "./Common/Icon";
import { useNavigate } from "react-router-dom";

// BottomNav 스타일 정의
const Wrapper = styled.div``;

const BottomNavWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background: ${(props) => props.theme.borderColor};
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-shadow: ${(props) => props.theme.bor};
  @media (min-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #ffffff; // 마우스를 올렸을 때 색상 변화
  }
`;
const BackNavwrapper = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: ${(props) => props.theme.borderColor};
    z-index: 1000;
    @media (min-width: 768px) {
      display: none; // 768px 이상의 화면에서는 숨기기
    }
  }
`;
const Backdesc = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: 100%;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;
const BackIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  transform: translateX(5px);
  transform: translateY(2px);
  align-items: center;
  margin-left: 10px;
`;
const Backtxt = styled.div`
  font-size: 15px;
`;

const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BackNavwrapper>
        <Backdesc onClick={() => navigate(-1)}>
          <BackIcon>
            <GoBack />
          </BackIcon>
          <Backtxt>뒤로</Backtxt>
        </Backdesc>
      </BackNavwrapper>
      <BottomNavWrapper>
        <NavItem onClick={() => navigate("/")}>
          <Home style={{ color: "#000" }} />
        </NavItem>
        <NavItem onClick={() => navigate("/Search")}>
          <MagnifyingGlassIcon />
        </NavItem>
        <NavItem>
          <PlusIcon width={30} onClick={() => navigate("postform")} />
        </NavItem>
        <NavItem onClick={() => navigate("/activity")}>
          <Like />
        </NavItem>
        <NavItem onClick={() => navigate("/profile")}>
          <UserIcon1 />
        </NavItem>
      </BottomNavWrapper>
    </Wrapper>
  );
};

export default MobileNav;

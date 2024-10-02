import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles.styles';
import { PlusIcon, MagnifyingGlassIcon, UserIcon1, Like, Home } from './Common/Icon';
import { useNavigate } from 'react-router-dom';


// BottomNav 스타일 정의
const BottomNavWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
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

const MobileNav = () => {
  const navigate = useNavigate()
  return (
    <BottomNavWrapper>
      <NavItem>
        <Home />
      </NavItem>
      <NavItem>
        <MagnifyingGlassIcon />
      </NavItem>
      <NavItem>
        <PlusIcon width={30}/>
      </NavItem>
      <NavItem>
        <Like />
      </NavItem>
      <NavItem>
        <UserIcon1 />
      </NavItem>
    </BottomNavWrapper>
  );
};

export default MobileNav;

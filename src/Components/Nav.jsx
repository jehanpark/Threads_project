import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Logo from "./Logo";
// import MyProfileImgs from "./MyProfileImgs";

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  /* padding: 0px 20px; */
  @media (max-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const LogoWrapper = styled.div`
  width: 40px; /* 고정 크기 설정 */
`;

const MyProfileImgs = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;

`;

const Ul = styled.ul`
  width: 620px;
  background-color: ${(props) => props.theme.headerBg};
  box-shadow: ${(props) => props.theme.bordershadow};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
`;

const Li = styled.li`
  color: #c95c5c;
  cursor: pointer;
  border-radius: 50px;
  width: ${(props) => 100 / props.$itemCount}%; /* $itemCount로 변경 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  ${(props) =>
    props.$isSelected /* $isSelected로 변경 */ &&
    css`
      color: ${(props) => props.theme.headerselect};
      background-color: ${(props) => props.theme.logoColor};
    `}
    
`;
const menuItems = styled.img`
  ${(props) =>
    props.$isSelected /* $isSelected로 변경 */ &&
    css`
    color: ${(props) => props.theme.selectIconColor};
    `}
`

const Nav = () => {
  const menuItems = [
    { name: "Home", icon: "/nav-icons/home.svg", path: "/" },
    { name: "Heart", icon: "/nav-icons/heart.svg", path: "/activity" },
    { name: "Plus", icon: "/nav-icons/plus.svg", path: "/" },
    { name: "Search", icon: "/nav-icons/search.svg", path: "/search" },
    { name: "User", icon: "/nav-icons/user.svg", path: "/profile" },
  ];
  const [selectedMenu, setSelectedMenu] = useState(0);
  const navigate = useNavigate();

  const onSelected = (index, path) => {
    setSelectedMenu(index);
    navigate(path); // path에 따라 페이지 이동
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo width={40} />
      </LogoWrapper>
      <Ul>
        {menuItems.map((menu, index) => (
          <Li
            key={index}
            $itemCount={menuItems.length} /* $itemCount로 변경 */
            $isSelected={selectedMenu === index} /* $isSelected로 변경 */
            onClick={() => onSelected(index, menu.path)}
          >
            <img src={menu.icon} alt={menu.name} />
          </Li>
        ))}
      </Ul>
      <MyProfileImgs>
        <Img src="./profile.png" />
      </MyProfileImgs>
    </Wrapper>
  );
};

export default Nav;

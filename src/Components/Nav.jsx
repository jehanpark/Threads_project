import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Logo from "./Logo";
import MyProfileImgs from "./MyProfileImgs";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Ul = styled.ul`
  width: 620px;
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 50px;
`;

const Li = styled.li`
  color: #000;
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
      color: #fff;
      background-color: #000;
    `}
`;
const ThemeToggleButton = styled.button`
  background-color: ${(props) => props.theme.navBg};
  color: ${(props) => props.theme.navTextColor};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 20px;
`;

const Nav = ({ toggleTheme }) => {
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
      <Logo width={40} fill={"#000"} />
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
      <MyProfileImgs />
      <ThemeToggleButton onClick={toggleTheme}>Toggle Theme</ThemeToggleButton>
    </Wrapper>
  );
};

export default Nav;

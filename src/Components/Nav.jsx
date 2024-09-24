import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MyProfileImgs from "./MyProfileImgs";
import GlobalStyles from "../styles/GlobalStyles.styles";

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
`;

const UserMenu = styled.div``;
const Nav = () => {
  const menuItems = ["Home", "About", "Services", "Contact", "User", "level"];

  return (
    <Wrapper>
      <Logo width={40} fill={"#fff"} />
      <Ul>
        {menuItems.map((menu, index) => (
          <Li key={index}>{menu}</Li>
        ))}
      </Ul>
      <MyProfileImgs />
    </Wrapper>
  );
};

export default Nav;

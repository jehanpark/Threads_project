import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Logo from "./Logo";
import { useAuth } from "../Contexts/AuthContext";
import { UserIcon1 } from "./Common/Icon";
import MobileNav from "./MobileNav";

const AllWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LogoWrapper = styled.div`
  width: 40px;
  cursor: pointer;
  @media screen and (width: 390px) {
    display: none;
  }
`;

const MyProfileImgs = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  @media screen and (width: 390px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const DefaultImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ul = styled.ul`
  width: 620px;
  background-color: ${(props) => props.theme.borderColor};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  list-style: none;
  border: 2px solid ${(props) => props.theme.mouseHoverBg};
  @media screen and (width: 390px) {
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    z-index: 100;
    border: none;
  }
`;

const Li = styled.li`
  color: #c95c5c;
  cursor: pointer;
  border-radius: 50px;
  width: ${(props) => 100 / props.$itemCount}%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  color: #bababa;
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.logoColor
      : props.theme.bordeborderColorrshadow};
  color: ${(props) =>
    props.$isSelected ? props.theme.bodyBg : props.theme.navIconColor};

  &:hover {
    background-color: ${(props) => props.theme.fontcolor};
    color: ${(props) => props.theme.bodyBg};
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    fill: none;
    transition: stroke 0.4s;
  }
`;

const Nav = () => {
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  const [selectedMenu, setSelectedMenu] = useState(0);

  const menuItems = [
    {
      name: "Home",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: "/",
    },
    {
      name: "Heart",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: "/activity",
    },
    {
      name: "Plus",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: "/postform",
    },
    {
      name: "Search",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.9999 21L16.6499 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: "/search",
    },
    {
      name: "User",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: "",
    },
  ];

  // URL이 변경될 때마다 현재 경로에 맞는 메뉴 선택
  useEffect(() => {
    const currentPath = location.pathname;
    const selectedIndex = menuItems.findIndex(
      (item) => item.path === currentPath
    );
    if (selectedIndex !== -1) {
      setSelectedMenu(selectedIndex);
    }
  }, [location.pathname, menuItems]);

  const onSelected = (index, path) => {
    setSelectedMenu(index);
    navigate(path); // path에 따라 페이지 이동
  };

  return (
    <AllWrapper>
      <MobileNav />
      <Wrapper>
        <Link to="/">
          <LogoWrapper>
            <Logo width={40} />
          </LogoWrapper>
        </Link>
        <Ul>
          {menuItems.map((menu, index) => (
            <Li
              key={index}
              $itemCount={menuItems.length}
              $isSelected={selectedMenu === index}
              onClick={() => onSelected(index, menu.path)}
              aria-current={selectedMenu === index ? "page" : undefined} // 접근성 향상
            >
              {menu.svg}
            </Li>
          ))}
        </Ul>
        <MyProfileImgs>
          {currentUser ? (
            <Link to="/profile">
              <Img src="/profile.png" alt="Profile" />
            </Link>
          ) : (
            <Link to="/login">
              <DefaultImgWrapper>
                <UserIcon1 />
              </DefaultImgWrapper>
            </Link>
          )}
        </MyProfileImgs>
      </Wrapper>
    </AllWrapper>
  );
};

export default Nav;

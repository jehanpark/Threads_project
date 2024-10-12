import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

export const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

// @media (max-width: 768px) {
// }

export const IdText = styled.h3`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.nomalIconColor};
`;

export const ImgWrap = styled.div`
  width: ${({ isSmallScreen }) => (isSmallScreen ? "46px" : "60px")};
  height: ${({ isSmallScreen }) => (isSmallScreen ? "46px" : "60px")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const Tap = styled.ul`
  width: ${({ isSmallScreen }) =>
    isSmallScreen ? "calc(100% - 10px)" : "calc(100% - 20px)"};
  height: ${({ isSmallScreen }) => (isSmallScreen ? "40px" : "48px")};
  border-radius: ${({ isSmallScreen }) => (isSmallScreen ? "8px" : "18px")};
  background: ${(props) => props.theme.borderColor};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* margin-bottom: 8px; */
  margin: ${({ isSmallScreen }) =>
    isSmallScreen ? "4px 0px" : " 0 auto  8px"};
  overflow: hidden;
  text-align: center;
  line-height: ${({ isSmallScreen }) => (isSmallScreen ? "38px" : "48px")};
  li {
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.nomalIconColor};
  }
`;

export const Desk = styled.div`
  height: 83px;
  font-size: 18px;
  color: ${(props) => props.theme.fontcolor};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const TextInput = styled.div`
  padding: 40px 40px 0 40px;
  width: ${({ isSmallScreen }) =>
    isSmallScreen ? "calc(100% - 10px)" : "calc(100% - 20px)"};
  margin: ${({ isSmallScreen }) =>
    isSmallScreen ? "4px opx" : " 0 auto  8px"};
  height: 68px;
  border-radius: 18px;
  background: ${(props) => props.theme.borderColor};
`;

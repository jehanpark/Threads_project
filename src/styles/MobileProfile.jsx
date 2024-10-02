import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

export const ProfileInnner = styled.div`
  padding: ${({ isSmallScreen }) =>
    isSmallScreen ? " 12px 14px" : "40px 40px 0 40px"};
  width: ${({ isSmallScreen }) => (isSmallScreen ? " 100%" : "654px")};
  height: ${({ isSmallScreen }) => (isSmallScreen ? " 260px" : "306px")};
  border-radius: ${({ isSmallScreen }) =>
    isSmallScreen ? "20px 20px 14px 14px" : "40px 40px 18px 18px"};
  background: ${(props) => props.theme.borderColor};
  margin: ${({ isSmallScreen }) => (isSmallScreen ? "4px" : " 0 auto  8px")};
`;

export const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const IdWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ isSmallScreen }) => (isSmallScreen ? "4px" : " 10px")};
`;

// export const Nick = styled.h1`
//   font-size: ${({ isSmallScreen }) => (isSmallScreen ? "16px" : " 24px")};
//   font-weight: 800;
//   color: ${(props) => props.theme.fontcolor};
// `;

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
  width: ${({ isSmallScreen }) => (isSmallScreen ? " 100%" : "654px")};
  height: ${({ isSmallScreen }) => (isSmallScreen ? "40px" : "48px")};
  border-radius: 18px;
  background: ${(props) => props.theme.borderColor};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* margin-bottom: 8px; */
  margin: ${({ isSmallScreen }) => (isSmallScreen ? "4px" : " 0 auto  8px")};
  overflow: hidden;
  text-align: center;
  line-height: ${({ isSmallScreen }) => (isSmallScreen ? "34px" : "48px")};
  li {
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.nomalIconColor};
  }
`;

export const Desk = styled.div`
  height: 83px;
  font-size: ${({ isSmallScreen }) => (isSmallScreen ? "16px" : "18px")};
  color: ${(props) => props.theme.fontcolor};
`;

export const TextInput = styled.div`
  padding: 40px 40px 0 40px;
  width: ${({ isSmallScreen }) => (isSmallScreen ? " 100%" : "654px")};
  margin: ${({ isSmallScreen }) => (isSmallScreen ? "4px" : " 0 auto  8px")};
  height: 68px;
  border-radius: 18px;
  background: ${(props) => props.theme.borderColor};
`;

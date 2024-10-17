import React from "react";
import styled from "styled-components";
import { lightTheme } from "../../styles/GlobalStyles.styles";
// import LogoImg from "../../images/insta.png";
// import RightArrow from "../../images/rightarrow.svg";
console.log(lightTheme);

const BorderItem = styled.div`
  ${({ type }) =>
    type === "borderWrapper" &&
    `
    margin: 0 auto;
    padding:10px 10px 0 10px; 
    width:${(props) => (props.isSmallScreen ? "100%" : "680px")};
    height: 898px;
    border-radius: 40px 40px 0px 0px;
    border: #C9C9C9;
    background:  #F5F5F5;
    border-filter: blur(4px);
    box-shadow: ${lightTheme.bordershadow}

    `}
  ${({ type }) =>
    type === "borderinner" &&
    `
    position: relative;
    top: 15px;
    margin: 0 23px;
    width: 634px;
    height: 230px;
    border: 1px solid #000;
    border-radius: 30px;
    background: #fff;
    `}
     ${({ type }) =>
    type === "loginborder" &&
    `
    width: 370px;
    height: 74px;
    border: 1px solid #D0D0D0;
    border-radius: 12px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 17px 11px;
    margin-top: 16px;

    /* 모바일에서는 flex로, 데스크탑에서는 none으로 설정 */
    @media (max-width: 768px) {
      display: flex;
    }
    @media (min-width: 769px) {
      display: none;
    }
    `}
  ${({ type }) =>
    type === "insitesWrapper" &&
    `
    width: ${(props) =>
      props.isSmallScreen
        ? "100%"
        : props.isTablet
        ? "100%"
        : "485.41px"}; // 수정!
    height: ${(props) => (props.isSmallScreen ? "100%" : "137px")};
    background: ${(props) => props.theme.borderColor};
    margin-top: 20px;
    margin-bottom: ${(props) => (props.isSmallScreen ? "" : "20px")};
    padding: ${(props) => (props.isSmallScreen ? "0" : "20px")};
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    `}
  ${({ type, isSmallScreen }) =>
    type === "followWrapper" &&
    `
    width:${(props) =>
      props.isSmallScreen
        ? "100%"
        : props.isTablet
        ? "100%"
        : "485.41px"}; // 수정!
    height: ${(props) => (props.isSmallScreen ? "100%" : "536px")};
     background: ${(props) => props.theme.borderColor};
    margin-top: 30px;
    padding: 24px;
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    `}
  ${(
    { type, isSmallScreen } // 다은 추가! (설정 아이템 웨퍼)
  ) =>
    type === "settingsWrapper" &&
    `
    width: 558.67px; // 수정!
    height: 100%;
    padding: 20px 0;
    background: #fff;
    margin-top: 30px;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    `}
  ${({ type }) =>
    type === "insitesWrapper_dark" &&
    `
    width: 640px;
    height: 137px;
    background: #181818;
    margin-top: 30px;
    padding: 24px;
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.1);
    `}
`;
const BorderTextItem = styled.div`
  position: ${({ type }) => (type === "borderinner" ? "absolute" : "relative")};
  top: ${({ type }) => (type === "borderinner" ? "30px" : "20px")};
  padding: 20px;
  display: flex;
  justify-content: start;
  text-align: center;
  color: ${({ type }) => (type === "borderinner" ? "#000" : "#888")};
`;
// const Border = ({ type, text }) => {
//   return (
//     <BorderItem type={type}>
//       {type === "borderinner" && (
//         <BorderTextItem type={type}>{text || "이너 아이템"}</BorderTextItem>
//       )}
//     </BorderItem>
//   );
// };

const Border = ({ type, text, children }) => {
  return (
    <BorderItem type={type}>
      {type === "borderinner" ? (
        <BorderTextItem type={type}>{text || "이너 아이템"}</BorderTextItem>
      ) : (
        children
      )}
    </BorderItem>
  );
};

export default Border;
// import styled from "styled-components";
// import { useMediaQuery } from "react-responsive";
// import LogoImg from "../../images/insta.png";
// import RightArrow from "../../images/rightarrow.svg";

// export const BorderItem = styled.div`
//   ${({ type }) =>
//     type === "borderWrapper" &&
//     `
//     margin: 0 auto;
//     width: ${(props) => (props.isSmallScreen ? "300px" : "680px")};
//     height: ${(props) => (props.isSmallScreen ? "100%" : "898px")};
//     border-radius: 40px 40px 0px 0px;
//     border: #C9C9C9;
//     background:  #F5F5F5;
//     border-filter: blur(4px);
//     `}
//   ${({ type }) =>
//     type === "borderinner" &&
//     `
//     position: relative;
//     top: 15px;
//     margin: 0 23px;
//     width: 634px;
//     height: 230px;
//     border: 1px solid #000;
//     border-radius: 30px;
//     background: #fff;
//     `}
//   ${({ type }) =>
//     type === "loginborder" &&
//     `
//     width: 370px;
//     height: 74px;
//     border: 1px solid #D0D0D0;
//     border-radius: 12px;
//     background: transparent;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 17px 11px;
//     margin-top: 16px;

//     /* 모바일에서는 flex로, 데스크탑에서는 none으로 설정 */
//     @media (max-width: 768px) {
//       display: flex;
//     }
//     @media (min-width: 769px) {
//       display: none;
//     }
//     `}
//   ${({ type, isSmallScreen, width, height }) =>
//     type === "insitesWrapper" &&
//     `
//     width: ${isSmallScreen ? "90%" : "485.41px"};
//     height: ${isSmallScreen ? "100%" : "137px"};
//     background: #F5F5F5;
//     margin-top: 30px;
//     padding: 24px;
//     border: none;
//     border-radius: 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
//     `}
//   ${({ type, isSmallScreen }) =>
//     type === "followWrapper" &&
//     `
//     width: ${isSmallScreen ? "90%" : "485.41px"};
//     height: ${isSmallScreen ? "100%" : "536px"};
//     background: #F5F5F5;
//     margin-top: 30px;
//     padding: 24px;
//     border: none;
//     border-radius: 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
//     `}
//   ${({ type }) =>
//     type === "insitesWrapper_dark" &&
//     `
//     width: 640px;
//     height: 137px;
//     background: #181818;
//     margin-top: 30px;
//     padding: 24px;
//     border: none;
//     border-radius: 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.1);
//     `}
// `;

// export const BorderTextItem = styled.div`
//   position: ${({ type }) => (type === "borderinner" ? "absolute" : "relative")};
//   top: ${({ type }) => (type === "borderinner" ? "30px" : "0px")};
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   gap: 35px;

//   /* 텍스트 색상 수정 부분 */
//   color: ${({ type }) => (type === "loginborder" ? "#000" : "#888")};
// `;

// export const ArrowImage = styled.img`
//   width: 16px; /* 화살표 이미지 크기 설정 */
//   height: 16px;
// `;

// // 이미지 스타일 컴포넌트 추가
// export const LogoImage = styled.img`
//   width: 40px; /* 원하는 크기로 이미지 조정 */
//   height: 40px;
// `;

// export const CreateAccountWrapper = styled.div`
//   position: relative;
//   width: ${(props) => (props.isSmallScreen ? "100%" : "634px")};
//   height: ${(props) => (props.isSmallScreen ? "100%" : "861px")};
//   margin: 0 auto;
//   margin-top: ${(props) => (props.isSmallScreen ? "0" : "78px")};
//   border: ${(props) => (props.isSmallScreen ? "2px solid #f2f2f2" : "none")};
//   border-radius: ${(props) => (props.isSmallScreen ? "0" : "30px")};
//   background: #fff;
// `;

// const Border_de = ({ type, text }) => {
//   const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

//   return (
//     <BorderItem type={type}>
//       <BorderTextItem type={type}>
//         <LogoImage src={LogoImg} alt="Instagram Logo" />
//         {text}
//         <ArrowImage src={RightArrow} alt="Right Arrow" />
//       </BorderTextItem>
//     </BorderItem>
//   );
// };

// export default Border_de;

// import styled from "styled-components";

// interface ResponsiveProps {
//   $isSmallScreen: boolean;
// }

// export const Wrapper = styled.div`
//   width: 100%;
//   height: calc(100vh - 15%);
//   margin: 0 auto;
//   color: ${(props) => props.theme.fontcolor};

//   /* display: flex;
//   align-items: center;
//   justify-content: center; */
// `;

// export const BgImg = styled.img<ResponsiveProps>`
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   width: 100%;
//   height: 533px;
//   object-fit: cover;
//   pointer-events: none;
// `;

// export const LoginInner = styled.div`
//   position: relative;
//   margin: 0 auto;
//   margin-top: 15%;
//   width: 370px;
//   height: 407px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   /* justify-content: center; */
// `;

// export const LogoWrapper = styled.div<ResponsiveProps>`
//   margin-bottom: 18px;
// `;

// export const LoginP = styled.p`
//   display: flex;
//   align-items: center;
//   gap: 3px;
//   margin-bottom: 16px;
// `;

// export const Form = styled.form`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// export const InputWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   margin-bottom: 10px;
// `;

// export const StyledInput = styled.input`
//   padding: 20px;
//   width: 100%;
//   height: 54px;
//   border: none;
//   border-radius: 12px;
//   font-size: 14px;
//   font-weight: 400;
//   color: #7e7e7e;
//   box-shadow: 0 0 0 0 ${(props) => props.theme.loginInputSelectColor};
//   transition: all 0.2s ease-in-out;
//   &:focus + label,
//   &:not(:placeholder-shown) + label {
//     opacity: 0;
//   }
//   &:focus {
//     outline: none;
//     box-shadow: 0 0 1px 2px ${(props) => props.theme.loginInputSelectColor};
//   }
//   &[type="submit"] {
//     cursor: pointer;
//     background-color: #000;
//     color: #fff;
//     border: 1px solid ${(props) => props.theme.mouseHoverFontcolor};
//     margin-bottom: 27px;
//   }
// `;

// export const StyledLabel = styled.label`
//   position: absolute;
//   left: 20px;
//   top: 21px;
//   font-size: 14px;
//   color: #7e7e7e;
//   pointer-events: none;
//   transition: all 0.2s ease-in-out;
//   opacity: 1;
// `;

// export const SingnUpText = styled.p`
//   display: flex;
//   justify-content: center;
//   font-size: 14px;
//   margin-bottom: 13px;
// `;

// export const ForgotPasswordText = styled.p`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 14px;
// `;

// export const Error = styled.span`
//   font-weight: 600;
//   color: tomato;
// `;

// export const Switcher = styled.span`
//   margin-top: 20px;
//   a {
//     color: #1d9bf0;
//     margin-left: 10px;
//     text-decoration: none;
//   }
// `;

// // => 다은님이 추가 해주신 컴포넌트
// export const Hr = styled.div<ResponsiveProps>`
//   width: 122px;
//   height: 2px;
//   border: 1px solid #e5e5e5;
//   display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")};
//   justify-content: center;
//   align-content: center;
// `;

// export const Or = styled.span<ResponsiveProps>`
//   width: 55px;
//   font-size: 14px;
//   color: #7e7e7e;
//   display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")};
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// export const Linebreak = styled.div<ResponsiveProps>`
//   display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")};
//   justify-content: center;
//   align-items: center;
//   margin-top: 41.5px;
//   margin-bottom: 46px;
// `;

// export const StyledSpan = styled.span<ResponsiveProps>`
//   font-size: ${(props) => (props.$isSmallScreen ? "14px" : "16px")};
//   color: ${(props) => props.theme.fontcolor};
//   display: ${(props) => (props.$isSmallScreen ? "block" : "inline")};
//   text-align: center;
// `;

// src/styles/RecycleStyles/login_dk.tsx

import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 15%);
  margin: 0 auto;
  color: ${(props) => props.theme.fontcolor};
`;

export const BgImg = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 533px;
  object-fit: cover;
  pointer-events: none;
  display: ${({ $isSmallScreen }) => ($isSmallScreen ? "none" : "block")};
`;

export const LoginInner = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 15%;
  width: 370px;
  height: 407px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: ${({ $isSmallScreen }) =>
    $isSmallScreen ? "center" : "flex-start"};
`;

export const LoginP = styled.p`
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: 16px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
  padding: 20px;
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #7e7e7e;
  box-shadow: 0 0 0 0 ${(props) => props.theme.loginInputSelectColor};
  transition: all 0.2s ease-in-out;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    opacity: 0;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 2px ${(props) => props.theme.loginInputSelectColor};
  }
  &[type="submit"] {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: 1px solid ${(props) => props.theme.mouseHoverFontcolor};
    margin-bottom: 27px;
  }
  &.insta-btn {
    width: 100%;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #67b5fa;
    outline: none;
    border: none;
    padding: 0px;
    color: #fff;
    border-radius: 12px;
  }
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 21px;
  font-size: 14px;
  color: #7e7e7e;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  opacity: 1;
`;

export const SingnUpText = styled.p`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 13px;
`;

export const ForgotPasswordText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
    margin-left: 10px;
    text-decoration: none;
  }
`;

// 추가된 컴포넌트들
export const Hr = styled.div`
  width: 122px;
  height: 2px;
  border: 1px solid #e5e5e5;
  display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")};
  justify-content: center;
  align-content: center;
`;

export const Or = styled.span`
  width: 55px;
  font-size: 14px;
  color: #7e7e7e;
  display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Linebreak = styled.div`
  display: ${({ $isSmallScreen }) => ($isSmallScreen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  margin-top: 41.5px;
  margin-bottom: 46px;
`;

export const StyledSpan = styled.span`
  font-size: ${(props) => (props.$isSmallScreen ? "14px" : "16px")};
  color: ${(props) => props.theme.fontcolor};
  display: ${(props) => (props.$isSmallScreen ? "block" : "inline")};
  text-align: center;
  padding-top: 3px;
`;

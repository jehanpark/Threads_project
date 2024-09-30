import React from "react";
import styled from "styled-components";
import { lightTheme } from "../../styles/GlobalStyles.styles";

console.log(lightTheme);

const BorderItem = styled.div`
  ${({ type }) =>
    type === "borderWrapper" &&
    `
    margin: 0 auto;
    width: 680px;
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

const Border = ({ type, text }) => {
  return (
    <BorderItem type={type}>
      {type === "borderinner" && (
        <BorderTextItem type={type}>{text || "이너 아이템"}</BorderTextItem>
      )}
    </BorderItem>
  );
};

export default Border;

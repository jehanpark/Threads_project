import React from "react";
import styled from "styled-components";

const ButtonItem = styled.button`
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  &:hover {
    background: #474747;
    color: #fff;
  }

  ${({ type }) =>
    type === "bigupload" &&
    `
      width: 300px;
      height: 80px;
      background: #1c1c1c;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      border-radius: 30px;
      transition: all 0.3s;
      &:hover {
        background: #fff; 
        color: #1c1c1c;
      }
    `}
  ${({ type }) =>
    type === "follow" &&
    `
      width: 80px;
      height: 30px;
      background: #fff;
      color: #000;
      font-size: 12px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s;
      &:hover {
        background: #0396F6; 
        color: #fff; 
      }
    `}
  ${({ type }) =>
    type === "edit" &&
    `
      width: 585px;
      height: 39px;
      background: #d9d9d9;
      color: #000;
      font-size: 15px;
      font-weight: Medium;
      border-radius: 6px;
      transition: all 0.3s;
      &:hover {
        background: #1c1c1c; 
        color: #fff; 
      }
    `}
  ${({ type }) =>
    type === "smalupload" &&
    `
      width: 64px;
      height: 36px;
      background: #fff;
      color: #000;
      font-size: 15px;
      font-weight: Medium;
      border-radius: 6px;
      transition: all 0.3s;
      &:hover {
        background: #1c1c1c; 
        color: #fff; 
      }
    `}
`;

const Button = ({ text, type, onClick }) => {
  return (
    <ButtonItem type={type} onClick={onClick}>
      {text || "button"}
    </ButtonItem>
  );
};

export default Button;

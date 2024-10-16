import React from "react";
import GlobalStyles from "../../styles/GlobalStyles.styles";
import styled from "styled-components";
import { color } from "framer-motion";

const ContentsAll = styled.div`
  @media (max-width: 768px) {
    
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: auto;
  padding: 10px 0;
  border-radius: 30px;
  background: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  transition: all 0.3s;
  z-index: 500;
  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 40%;
    bottom: calc( 0px + 70px);
    right: 0;
    top: auto;
    border-radius: 30px 30px 0 0;
  }
`;
const Contentswrapper = styled.div`
  @media (max-width: 768px) {
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
`;
const TopRec = styled.div`
  @media (max-width: 768px) {
    width: 40px;
    height: 5px;
    background: #404040;
    border-radius: 16px;
  }
`;

const Optionwrapper = styled.div`
  padding: 10px;
  width: auto;
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
`;
const Li = styled.div`
  padding: 18px;
  width: 280px;
  text-align: center;
  transition: all 0.3s;
  border-radius: 20px;
  &:hover {
    background: ${(props) => props.theme.mouseHoverBg};
    color: ${(props) => props.theme.mouseHoverFontcolor};
  }
  &:nth-child(1) {
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
    color: #ff3040;
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 18px;
    text-align: center;
    font-weight: bold;
    border-radius: 16px;
    color: ${(props) => props.theme.fontcolor};
    transition: all 0.3s;
  }
`;
const UpLoadButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    width: 300px;
    height: 70px;
    background: ${(props) => props.theme.fontcolor};
    color: ${(props) => props.theme.logoColor};
    font-size: 15px;
    font-weight: bold;
    border-radius: 16px;
    border: none;
    transition: all 0.3s;
    &:hover {
      background: #fff;
      color: #1c1c1c;
    }
  }
`;

const PostSetModal = () => {
  return (
    <ContentsAll>
      <Wrapper>
        <Contentswrapper>
          <TopRec></TopRec>
          <Optionwrapper>
            <Li>수정</Li>
            <Li>리포스트</Li>
            <Li>삭제</Li>
          </Optionwrapper>
        </Contentswrapper>
      </Wrapper>
    </ContentsAll>
  );
};

export default PostSetModal;

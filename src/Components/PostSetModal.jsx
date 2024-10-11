import React from "react";
import GlobalStyles from "../styles/GlobalStyles.styles";
import styled from "styled-components";
import { color } from "framer-motion";

const ContentsAll = styled.div`
  @media (max-width: 768px) {
    position: relative;
  }
`

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
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
    bottom: 0;
    left: 0;
  }
`;
const Contentswrapper = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: #fff;
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
          <UpLoadButton>게시글 업로드</UpLoadButton>
        </Contentswrapper>
      </Wrapper>
    </ContentsAll>
  );
};

export default PostSetModal;

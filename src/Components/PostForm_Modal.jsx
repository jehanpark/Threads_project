import React from "react";
import GlobalStyles from "../styles/GlobalStyles.styles";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 420px;
  width: 100%;
  border-radius: 30px 30px 0 0;
  background: ${(props) => props.theme.bodyBg};
`;
const Contentswrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
const TopRec = styled.div`
  width: 40px;
  height: 5px;
  background: #404040;
  border-radius: 16px;
`;
const Title = styled.div`
  font-weight: 700;
  color: #737373;
  margin: 32px 0;
`;
const Optionwrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
const Li = styled.div`
width: 80%;
padding: 18px;
text-align: center;
border-radius: 20px;
color: ${(props)=>props.theme.fontcolor};
transition: all 0.3s;
&:hover{
  background: ${(props)=>props.theme.mouseHoverBg};
  color: ${(props)=>props.theme.mouseHoverFontcolor};
}
`;
const Button = styled.button`

`

const PostForm_Modal = (centerChild, Button) => {
  return (
    <Wrapper>
      <Contentswrapper>
        <TopRec></TopRec>
        <Title>새로운 스레드를 원하는 사람들에게 공개하세요</Title>
        <Optionwrapper>
          <Li>모두에게 공개</Li>
          <Li>내 팔로워만</Li>
          <Li>내가 언급한 사람에게만</Li>
          <Li>나만 보기</Li>
        </Optionwrapper>
      </Contentswrapper>
    </Wrapper>
  );
};

export default PostForm_Modal;

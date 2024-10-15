import React, { useEffect } from "react";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Intro from "../Components/LoadingLogo/Intro";
import PostForm from "../Components/post/PostForm";
import TimeLine from "../Components/post/TimeLine";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
`;

const ContentsBorder = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 0;
  }
`;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  max-width: 680px;
  height: 600px;
  border-radius: 40px 40px 0px 0px;
  background-color: ${(props) => props.theme.borderColor};
  @media (max-width: 768px) {
    width: 90%;
    border-radius: 20px 20px 0px 0px;
  }
  @media (max-width: 480px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Border>
        <ContentsBorder>
          <TimeLine />
        </ContentsBorder>
      </Border>
    </Wrapper>
  );
};

export default Home;

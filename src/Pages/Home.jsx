import React, { useEffect } from "react";

import Nav from "../Components/Nav";
import Intro from "../Components/Intro";
import styled from "styled-components";
import PostForm from "../Components/PostForm";
import TimeLine from "../Components/TimeLine";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
`;

const Home = () => {
  return (
    <Wrapper>
      <PostForm/>
      <TimeLine/>
      <Intro />
    </Wrapper>
  );
};

export default Home;

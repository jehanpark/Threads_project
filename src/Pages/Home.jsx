import React from "react";

import Nav from "../Components/Nav";
import Intro from "../Components/Intro";
import styled from "styled-components";
import Border from "../Components/Common/Border";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
`;

const Home = () => {
  return (
    <Wrapper>
      <Intro />
      <Border type={"borderWrapper"} />
    </Wrapper>
  );
};

export default Home;

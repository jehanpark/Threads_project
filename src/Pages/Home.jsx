import React, { useEffect } from "react";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Intro from "../Components/LoadingLogo/Intro";
import PostForm from "../Components/post/PostForm";
import TimeLine from "../Components/TimeLine";
import EtcModal from "../Components/post/EtcModal";


const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
`;

const Home = () => {
  return (
    <Wrapper>
      {/* <EtcModal/> */}
      <TimeLine />
    </Wrapper>
  );
};

export default Home;

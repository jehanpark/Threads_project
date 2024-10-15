import React, { useEffect } from "react";
import styled from "styled-components";
import Nav from "../Components/Nav";
import Intro from "../Components/LoadingLogo/Intro";
import PostForm from "../Components/post/PostForm";
import TimeLine from "../Components/post/TimeLine";
import EtcModal from "../Components/post/EtcModal";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  /* overflow: hidden; */
  overflow-y: hidden;
  @media (max-width: 768px) {
    height: calc(100vh - 120px);
    ::-webkit-scrollbar {
      overflow-y: hidden;
      display: none;
    }
  }
`;

const BoederWrapper = styled.div`
  /* bottom: 0;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  margin: 0;
  overflow: hidden;
  height: 85%; */
  margin: 0 auto;
  width: 680px;
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 70px);
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const PostlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  border-radius: 40px 40px 0 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    overflow-y: hidden;
    display: none !important;
  }
  scrollbar-width: none;
  transition: transform 0.3s ease-out;

  &.bounce {
    animation: bounce-back 1s ease-in-out;
  }

  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(40px); /* 살짝 위로 올렸다가 */
    }
    100% {
      transform: translateY(0px); /* 원래 자리로 돌아오기 */
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin-top: 6px;
    border-radius: 0;
  }
`;

const handleScroll = () => {
  const element = wrapperRef.current;
  // 스크롤이 가장 위에 도달했는지 확인
  if (element.scrollTop === 0) {
    // 텐션감을 위한 애니메이션 트리거
    setIsBouncing(true);

    // 0.5초 후에 애니메이션 클래스 제거
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  }
};

const Home = () => {
  return (
    <Wrapper>
      <BoederWrapper>
        <PostlistWrapper>
          <TimeLine />
        </PostlistWrapper>
      </BoederWrapper>
    </Wrapper>
  );
};

export default Home;

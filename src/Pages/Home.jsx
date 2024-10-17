import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TimeLine from "../Components/post/TimeLine";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// 모든 페이지들
import Activity from "./Activity";
import PostForm from "../Components/post/PostForm";
import Search from "./Search";
import Profile from "./Profile";
import Insites from "./Insites";
import Settings from "./Settings";

const DIV = styled.div`
  display: flex;
  gap: 14px;
`;

// & > * {
//   /* flex: 2; */
//   flex: 30;
//   color: red;
//   .pinned-profile {
//     color: red !important;
//     div {
//       color: red !important;
//       border: 1px solid red;
//     }
//   }
// }

const AddPages = styled.div`
  /* padding-left: 400px;s */
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-left: 50vw;
  @media (max-width: 1390px) {
    padding-left: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */

  height: 100vh;
  /* width: 100%; */
  /* height: calc(100vh - 120px); */
  /* margin-top: 120px; */
  /* overflow: hidden; */
  /* z-index: -1; */
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
  }
`;
const BoederWrapper = styled.div`
  width: 680px;
  /* border: 1px solid red; */
  bottom: 0;
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* position: fixed; */
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* margin: 0; */

  /* max-width: 680px;
  min-width: 400px; */
  /* height: 85%; */

  /* overflow: hidden; */
  @media (max-width: 768px) {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0px;
    border-radius: 0;
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
    display: none;
  }
  scrollbar-width: none;
  transition: transform 0.3s ease-out;

  &.bounce {
    animation: bounce-back 0.5s ease-in-out;
  }

  @keyframes bounce-back {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(20px); /* 살짝 위로 올렸다가 */
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

const BUTTONS = styled.div`
  position: fixed;
  left: 0px;
  z-index: 1000;
`;

const CarouselWrapper = styled.div`
  /* border: 1px solid red;s */
  width: 100vw;
`;

////////////
const ActivityWrapper = styled.div`
  width: 100%; /* 모든 슬라이드 아이템의 너비가 동일하게 설정 */
`;

const ProfileWrapper = styled.div`
  width: 100%; /* 동일하게 100% 너비 설정 */
`;

const Home = () => {
  const wrapperRef = useRef(null); // DOM 요소 접근을 위한 useRef
  const [isBouncing, setIsBouncing] = useState(false); // 바운스 상태 관리

  // 각 페이지 컴포넌트를 표시할지 여부를 관리
  const [pages, setPages] = useState({
    showActivity: false,
    showProfile: false,
  });
  // 버튼 클릭 시 페이지 추가
  const handlePin = (page) => {
    setPages((prevState) => ({
      ...prevState,
      [page]: true,
    }));
  };

  const handleScroll = () => {
    const element = wrapperRef.current;

    // 스크롤이 맨 위에 도달했는지 확인
    if (element.scrollTop === 0) {
      setIsBouncing(true);

      // 0.5초 후에 애니메이션 클래스 제거
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  };

  useEffect(() => {
    const element = wrapperRef.current;
    if (element) {
      // 스크롤 이벤트 리스너 추가
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1384 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1384, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  //   <BUTTONS>
  //   <h1>Home Component</h1>
  //   {/* 버튼을 클릭하여 컴포넌트를 추가 */}
  //   <button onClick={() => handlePin("showActivity")}>Pin Activity</button>
  //   <button onClick={() => handlePin("showProfile")}>Pin Profile</button>
  // </BUTTONS>

  return (
    <DIV>
      <CarouselWrapper>
        <Carousel responsive={responsive}>
          <AddPages>
            <Wrapper>
              <BoederWrapper>
                <PostlistWrapper
                  ref={wrapperRef}
                  className={isBouncing ? "bounce" : ""}
                >
                  <TimeLine />
                </PostlistWrapper>
              </BoederWrapper>
            </Wrapper>
          </AddPages>
          <AddPages>
            <Profile />
          </AddPages>
          <AddPages>
            <Profile />
          </AddPages>
          <AddPages>
            <Profile />
          </AddPages>
        </Carousel>
      </CarouselWrapper>

      {/* <Wrapper>
        <BoederWrapper>
          <PostlistWrapper
            ref={wrapperRef}
            className={isBouncing ? "bounce" : ""}
          >
            <TimeLine />
          </PostlistWrapper>
        </BoederWrapper>
      </Wrapper> */}

      {/* //   핀으로 추가된 컴포넌트들 */}
      {pages.showActivity && (
        <AddPages className="pinned-activity pinned">
          <Activity />
        </AddPages>
      )}
      {pages.showProfile && (
        <AddPages className="pinned-profile pinned">
          <Profile />
        </AddPages>
      )}
    </DIV>
  );
};

export default Home;

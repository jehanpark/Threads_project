// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import TimeLine from "../Components/post/TimeLine";

// const Wrapper = styled.div`
//   width: 100%;
//   /* height: calc(100vh - 120px); */
//   overflow-y: hidden;
//   /* margin-top: 120px; */
//   @media (max-width: 768px) {
//     height: calc(100vh - 100px);
//     ::-webkit-scrollbar {
//       display: none;
//     }
//   }
// `;

// const BoederWrapper = styled.div`
//   margin: 0 auto;
//   width: 680px;
//   height: 100%;
//   border-radius: 40px 40px 0px 0px;
//   background: ${(props) => props.theme.border};
//   box-shadow: ${(props) => props.theme.bordershadow};

//   @media (max-width: 768px) {
//     position: absolute;
//     bottom: 0;
//     border-radius: 0;
//     width: 100%;
//     height: calc(100% - 70px);
//     box-shadow: none;
//     border-radius: 0px 0px 0px 0px;
//   }
// `;

// const PostlistWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   height: 100%;
//   width: 100%;
//   border-radius: 40px 40px 0 0;
//   overflow-y: scroll;
//   ::-webkit-scrollbar {
//     display: none;
//   }
//   scrollbar-width: none;
//   transition: transform 0.3s ease-out;

//   &.bounce {
//     animation: bounce-back 0.5s ease-in-out;
//   }

//   @keyframes bounce-back {
//     0% {
//       transform: translateY(0px);
//     }
//     50% {
//       transform: translateY(20px); /* 살짝 위로 올렸다가 */
//     }
//     100% {
//       transform: translateY(0px); /* 원래 자리로 돌아오기 */
//     }
//   }

//   @media (max-width: 768px) {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     height: 100%;
//     margin-top: 6px;
//     border-radius: 0;
//   }
// `;

// const Home = () => {
//   const wrapperRef = useRef(null); // DOM 요소 접근을 위한 useRef
//   const [isBouncing, setIsBouncing] = useState(false); // 바운스 상태 관리

//   const handleScroll = () => {
//     const element = wrapperRef.current;

//     // 스크롤이 맨 위에 도달했는지 확인
//     if (element.scrollTop === 0) {
//       setIsBouncing(true);

//       // 0.5초 후에 애니메이션 클래스 제거
//       setTimeout(() => {
//         setIsBouncing(false);
//       }, 500);
//     }
//   };

//   useEffect(() => {
//     const element = wrapperRef.current;
//     if (element) {
//       // 스크롤 이벤트 리스너 추가
//       element.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
//       if (element) {
//         element.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, []);

//   return (
//     <Wrapper>
//       <BoederWrapper>
//         <PostlistWrapper
//           ref={wrapperRef}
//           className={isBouncing ? "bounce" : ""}
//         >
//           <TimeLine />
//         </PostlistWrapper>
//       </BoederWrapper>
//     </Wrapper>
//   );
// };

// export default Home;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TimeLine from "../Components/post/TimeLine";

const Wrapper = styled.div`
  /* width: 100%; */
  /* height: calc(100vh - 120px); */
  height: 100vh;
  margin-top: 120px;
  /* overflow: hidden; */
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
  }
`;
const BoederWrapper = styled.div`
  /* position: fixed; */
  bottom: 0;
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* margin: 0; */
  width: 680px;
  height: 100%;
  /* height: 85%; */
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  /* overflow: hidden; */
  @media (max-width: 768px) {
    position: absolute;
    width: 100%;
    bottom: 0;
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

const Home = () => {
  const wrapperRef = useRef(null); // DOM 요소 접근을 위한 useRef
  const [isBouncing, setIsBouncing] = useState(false); // 바운스 상태 관리

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

  return (
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
  );
};

export default Home;

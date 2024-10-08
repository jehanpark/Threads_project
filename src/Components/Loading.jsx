import React, { useState, useEffect } from "react";
import styled from "styled-components";


// 스타일 컴포넌트 정의
const LoadingContainer = styled.div`
width: 100%;
height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; /* 배경색 */
`;

const SvgIcon = styled.svg`
  width: 50px;
  height: 56px;
  animation: rotate 2s linear infinite; /* 로고에 회전 애니메이션 추가 */

  @keyframes rotate {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="46"
        viewBox="0 0 40 46"
        fill="none"
      >
        <path
          d="M38 15C37.1667 10.6667 32.5 2 20.5 2C5.5 2 2 14 2 23.5C2 33 7 42.5 17.5 43.5C28 44.5 33.5 40.5 35.5 34.5C37.5 28.5 33 23.5 27 21.5C21 19.5 12.5 21.5 13.5 28C14.5 34.5 26 34.5 28 27C30 19.5 27.5 15.5 26 14.5C24.5 13.5 18.5 10.5 13.5 16"
          stroke="black"
          strokeWidth="4"
        />
      </SvgIcon>
    </LoadingContainer>
  );
};

export default Loading;

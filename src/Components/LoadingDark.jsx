// src/components/Loading/Loading.js

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

// 배경 페이드아웃 애니메이션 정의
const fadeOut = keyframes`
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

// 배경을 담당하는 Styled 컴포넌트 정의
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ animate }) => (animate ? fadeOut : 'none')} 0.3s ease-in-out forwards;
  transition: opacity 2.5s ease-in-out;
`;

// Styled SVG 컴포넌트 정의
const Svg = styled.svg`
  position: relative;
  width: 60px;
  height: 66px;
`;

// Styled Path 컴포넌트 정의
const Path = styled.path`
  stroke: #ffffff;
  stroke-width: 4;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: ${draw} 3s ease-in-out forwards;

  &:hover {
    transform: scale(1.1) rotate(5deg); /* 마우스를 올렸을 때 확대 및 회전 효과 */
  }
`;

const Loading = () => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    // 3초 후 애니메이션 완료 처리
    const timer = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 3000); // SVG 애니메이션 시간과 맞춤 (3초)

    return () => clearTimeout(timer); // 클린업 타이머
  }, []);

  return (
    <Background animate={isAnimationFinished}>
      <Svg viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M38 15C37.1667 10.6667 32.5 2 20.5 2C5.5 2 2 14 2 23.5C2 33 7 42.5 17.5 43.5C28 44.5 33.5 40.5 35.5 34.5C37.5 28.5 33 23.5 27 21.5C21 19.5 12.5 21.5 13.5 28C14.5 34.5 26 34.5 28 27C30 19.5 27.5 15.5 26 14.5C24.5 13.5 18.5 10.5 13.5 16" />
      </Svg>
    </Background>
  );
};

export default Loading;

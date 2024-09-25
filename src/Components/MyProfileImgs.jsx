import React from "react";
import styled from "styled-components";
const ImgContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* border: 1px solid skyblue; */
  cursor: pointer;
`;
const Img = styled.img`
  /* background-image: url("./assets/profile.png"); */
  width: 100%;
  height: 100%;
`;

const MyProfileImgs = () => {
  return (
    <>
      <ImgContainer>
        <Img src="/profile.png" />
      </ImgContainer>
    </>
  );
};

export default MyProfileImgs;

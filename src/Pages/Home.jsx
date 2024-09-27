import React, { useState, useEffect, useCallback } from "react";
import Nav from "../Components/Nav";
import Button from "../Components/Common/Button";
import Border from "../Components/Common/Border";
import Search from "../Components/Common/Search";
import Modal from "../Components/Common/Modal";
import styled from "styled-components";

const ExWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

const BorderEx = styled.div`
  margin-top: 20px;
  // 화이팅!
`;

const BtnEx = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true); // 버튼 클릭 시 모달 열림
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <Nav />
      <ExWrap>
        <BtnEx>
          <Button text={"스레드 업로드"} type={"bigupload"} />
          <Button text={"팔로우"} type={"follow"} onClick={handleButtonClick} />
          <Button text={"프로필 수정"} type={"edit"} />
          <Button text={"게시"} type={"smalupload"} />
          <Search />
        </BtnEx>
        <BorderEx>
          <Border type={"borderwrapper"} />
          <Border type={"borderinner"} />
          <Border type={"bordersmall"} />
        </BorderEx>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </ExWrap>
    </div>
  );
};

export default Home;

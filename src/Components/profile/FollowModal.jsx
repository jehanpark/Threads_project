import { useState } from "react";
import styled from "styled-components";
import FollowersList from "../Search/FollowerList";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 40%;
    bottom: calc(0px + 70px);
    right: 0;
    top: auto;
    border-radius: 30px 30px 0 0;
  }
`;

const FollowModalBox = styled.div`
  width: 450px;
  height: 530px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  padding: 64px 11px 0 11px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  display: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "block")};
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.headerBg};
    padding: 40% 20px;
    border-radius: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ContentsBorder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: calc(100% - 30px);
  padding: 0 10px;
  overflow-y: auto;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
    max-height: 100%;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    width: 100%;
    max-height: 100%;
  }
`;

const Box = styled.div`
  width: 100%;
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: ${(props) => props.theme.headerBg};
  margin-bottom: 10px;
  &.mobile {
    display: none;
    margin-top: 8px;
    @media screen and (max-width: 768px) {
      display: block;
      text-align: center;
      background: ${(props) => props.theme.borderstroke};
      &:hover {
        background: ${(props) => props.theme.followerfont};
        color: ${(props) => props.theme.btnBgColor};
      }
    }
  }
`;

// const FollowersList =

const FollowModal = ({ open, close }) => {
  if (!open) return null;

  return (
    <>
      <ModalOverlay onClick={close}>
        <FollowModalBox onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={close}>X</CloseButton>
          <ContentsBorder>
            <FollowersList />
          </ContentsBorder>
          <Box className="mobile" onClick={close}>
            모달 닫기
          </Box>
        </FollowModalBox>
      </ModalOverlay>
    </>
  );
};

export default FollowModal;

import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

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
  z-index: 999;
`;

const OtherModalBox = styled.div`
  width: ${({ isSmallScreen }) => (isSmallScreen ? "100%" : "450px")};
  height: ${({ isSmallScreen }) => (isSmallScreen ? "100%" : "530px")};
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  padding: ${({ isSmallScreen }) =>
    isSmallScreen ? "40% 20px" : "64px 11px 0 11px"};
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  /* display: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "flex")}; */
  flex-direction: column;
  @media screen and (min-width: 768px) {
    background: ${(props) => props.theme.nomalIconColor};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
`;

const Box = styled.button`
  width: 100%;
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 15px;
  padding: 15px;
  background: ${(props) => props.theme.borderColor};
  margin: 0px auto 10px;
  &:hover {
    background: ${(props) => props.theme.borderWrapper};
  }
`;

const OtherBtnModal = ({ open, close, profile }) => {
  if (!open) return null;

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      <ModalOverlay onClick={close}>
        <OtherModalBox
          isSmallScreen={isSmallScreen}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={close}>X</CloseButton>
          <Box>친한 친구 추가</Box>
          <Box>알림 설정 취소</Box>
          <Box>팔로잉 취소</Box>
        </OtherModalBox>
      </ModalOverlay>
    </>
  );
};
export default OtherBtnModal;

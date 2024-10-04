import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import LogoImg from "../../images/insta.png";
import RightArrow from "../../images/rightarrow.svg";

const BorderItem = styled.div`
  ${({ type }) =>
    type === "borderWrapper" &&
    `
    margin: 0 auto;
    width: 680px;
    height: 898px;
    border-radius: 40px 40px 0px 0px;
    border: #C9C9C9;
    background:  #F5F5F5;
    border-filter: blur(4px);
    `}
  ${({ type }) =>
    type === "borderinner" &&
    `
    position: relative;
    top: 15px;
    margin: 0 23px;
    width: 634px;
    height: 230px;
    border: 1px solid #000;
    border-radius: 30px;
    background: #fff;
    `}
  ${({ type }) =>
    type === "loginborder" &&
    `
    width: 370px;
    height: 74px;
    border: 1px solid #D0D0D0;
    border-radius: 12px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 17px 11px;
    margin-top: 16px;

    @media (max-width: 768px) {
      display: flex;
    }
    // @media (min-width: 769px) {
    //   display: none;
    // }
    `}
`;
const BorderTextItem = styled.div`
  position: ${({ type }) => (type === "borderinner" ? "absolute" : "relative")};
  top: ${({ type }) => (type === "borderinner" ? "30px" : "0px")};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 35px;

  /* 텍스트 색상 수정 부분 */
  color: ${({ type }) => (type === "loginborder" ? "#000" : "#888")};
`;

const ArrowImage = styled.img`
  width: 16px; /* 화살표 이미지 크기 설정 */
  height: 16px;
`;

// 이미지 스타일 컴포넌트 추가
const LogoImage = styled.img`
  width: 40px; /* 원하는 크기로 이미지 조정 */
  height: 40px;
`;

const Border = ({ type, text }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <BorderItem type={type}>
      <BorderTextItem type={type}>
        <LogoImage src={LogoImg} alt="Instagram Logo" />
        {text}
        <ArrowImage src={RightArrow} alt="Right Arrow" />
      </BorderTextItem>
    </BorderItem>
  );
};

export default Border;

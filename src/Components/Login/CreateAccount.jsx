import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo";
import LogoTextMark from "../LogoTextMark";
import Border from "../Common/Button";
import JoinQR from "../../images/QRcode.jpg";

import {
  Wrapper,
  LoginInner,
  LogoWrapper,
  LoginP,
  Form,
  InputWrapper,
  StyledInput,
  StyledBtn,
  StyledLabel,
} from "./RecycleStyles/login";

// const StyledInput = styled.button`
//   background: #0396f6;
// `;

const JoinContainer = styled.div`
  position: relative;
  width: 634px;
  height: 861px;
  margin: 0 auto;
  margin-top: 78px;
  border: 2px solid #f2f2f2;
  border-radius: 30px;
  background: #fff;

  /* 블러 효과를 ::before 가상 요소에 적용 */
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 30px; /* 블러 영역의 모서리 반경 조정 */
    border: 2px solid #f2f2f2;
    background: #f2f2f2;
    filter: blur(8px); /* 블러 강도 조정 */
    z-index: -1; /* 블러 효과가 내부 내용에 영향을 주지 않도록 아래쪽으로 */
  }
`;

const JoinText = styled.div`
  color: #474747;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  margin-top: 29px;
  margin-bottom: 74px;
`;

const Joininfo = styled.span`
  color: #737373;
  max-width: 370px;
  margin-bottom: 24px;
`;

const JoinQRcode = styled.img`
  width: 70px; /* 원하는 너비로 설정 */
  height: auto; /* 비율을 유지하며 높이를 자동으로 설정 */
  position: absolute; /* 절대 위치 지정 */
  top: 666px;
  left: 396px;
`;

const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onChange = () => {};
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Wrapper isSmallScreen={isSmallScreen}>
      <JoinContainer isSmallScreen={isSmallScreen}>
        <LoginInner isSmallScreen={isSmallScreen}>
          <LogoWrapper isSmallScreen={isSmallScreen}>
            <Logo width={40} />
          </LogoWrapper>
          <LoginP>
            <JoinText isSmallScreen={isSmallScreen}>
              <LogoTextMark width={62} />
              에서 다양한 사람과 소통해 보세요!
            </JoinText>
          </LoginP>
          <Form gap="24px">
            <InputWrapper>
              <StyledInput
                bgColor="#f0f0f0"
                onChange={onChange}
                type="id"
                id="id"
                placeholder=""
                required
                value={id}
              />
              <StyledLabel htmlFor="id">전화번호 또는 이메일 주소</StyledLabel>
            </InputWrapper>
            <InputWrapper>
              <StyledInput
                bgColor="#f0f0f0"
                onChange={onChange}
                type="password"
                id="password"
                placeholder=""
                required
                value={password}
              />
              <StyledLabel htmlFor="password">사용자 이름</StyledLabel>
            </InputWrapper>
            <InputWrapper>
              <StyledInput
                bgColor="#f0f0f0"
                onChange={onChange}
                type="password"
                id="password"
                placeholder=""
                required
                value={password}
              />
              <StyledLabel htmlFor="password">
                비밀번호를 입력해주세요.
              </StyledLabel>
            </InputWrapper>
            <InputWrapper>
              <StyledInput
                bgColor="#f0f0f0"
                onChange={onChange}
                type="password"
                id="password"
                placeholder=""
                required
                value={password}
              />
              <StyledLabel htmlFor="password">
                비밀번호를 확인해주세요.
              </StyledLabel>
            </InputWrapper>
            <Joininfo>
              저희 서비스를 이용하는 사람이 회원님의 연락처 정보를
              <br />
              instagram에 업로드했을 수도 있습니다.
            </Joininfo>
          </Form>
          <InputWrapper>
            <StyledBtn type="join">가입하기</StyledBtn>
          </InputWrapper>
          <JoinQRcode src={JoinQR} alt="JoinQR" />
        </LoginInner>
      </JoinContainer>
    </Wrapper>
  );
};

export default CreateAccount;

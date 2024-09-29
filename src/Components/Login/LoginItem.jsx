import React, { useState } from "react";
import Logo from "../Logo";
import LogoTextMark from "../LogoTextMark";
import { Link } from "react-router-dom";

import {
  Wrapper,
  BgImg,
  LoginInner,
  LogoWrapper,
  LoginP,
  Form,
  InputWrapper,
  StyledInput,
  StyledLabel,
  SingnUpText,
  ForgotPasswordText,
} from "./RecycleStyles/login";

const LoginItem = () => {
  const [emailPlaceholder, setEmailPlaceholder] = useState(
    "사용자 이름, 전화번호 또는 이메일 주소"
  );
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("비밀번호");

  return (
    <Wrapper>
      <BgImg src="/login/thread_login_bg.png" />
      <LoginInner>
        <LogoWrapper>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <LogoTextMark width={62} />
          <span>계정으로 로그인</span>
        </LoginP>
        <Form>
          <InputWrapper>
            <StyledInput type="email" id="email" placeholder=" " required />
            <StyledLabel htmlFor="email">
              사용자 이름, 전화번호 또는 이메일 주소
            </StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="password"
              id="password"
              placeholder=" "
              required
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput type="submit" value="로그인" />
          </InputWrapper>
          <Link>
            <SingnUpText>회원가입</SingnUpText>
          </Link>
          <Link>
            <ForgotPasswordText>비밀번호를 잊으셨나요?</ForgotPasswordText>
          </Link>
        </Form>
      </LoginInner>
    </Wrapper>
  );
};

export default LoginItem;

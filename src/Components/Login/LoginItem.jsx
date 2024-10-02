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
  // const [emailPlaceholder, setEmailPlaceholder] = useState(
  //   "사용자 이름, 전화번호 또는 이메일 주소"
  // );
  // const [passwordPlaceholder, setPasswordPlaceholder] = useState("비밀번호");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onChange = () => {};
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
            <StyledInput
              onChange={onChange}
              type="id"
              id="id"
              placeholder=""
              required
              value={id}
            />
            <StyledLabel htmlFor="id">
              사용자 이름, 전화번호 또는 이메일 주소
            </StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="password"
              id="password"
              placeholder=""
              required
              value={password}
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="submit"
              value={isLoading ? "Loading.." : "Login!"}
            />
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

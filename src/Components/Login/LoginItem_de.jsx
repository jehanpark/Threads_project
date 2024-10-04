import React, { useState } from "react";
import Logo from "../Logo";
import LogoTextMark from "../LogoTextMark";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Border from "../Common/Border";

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
  Hr,
  Or,
  Linebreak,
} from "./RecycleStyles/login_de";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginItemDe = () => {
  // const [emailPlaceholder, setEmailPlaceholder] = useState(
  //   "사용자 이름, 전화번호 또는 이메일 주소"
  // );
  // const [passwordPlaceholder, setPasswordPlaceholder] = useState("비밀번호");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onChange = () => {};
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const onSubmit = () => {};
  return (
    <Wrapper>
      <BgImg isSmallScreen={isSmallScreen} src="/login/thread_login_bg.png" />
      <LoginInner>
        <LogoWrapper isSmallScreen={isSmallScreen}>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <LogoTextMark width={62} />
          <span isSmallScreen={isSmallScreen}>계정으로 로그인</span>
        </LoginP>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="id"
              id="id"
              name="id"
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
              name="password"
              placeholder=""
              required
              value={password}
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="submit"
              value={isLoading ? "Loading.." : "로그인"}
            />
          </InputWrapper>
          <Link to="/create-account">
            <SingnUpText>회원가입</SingnUpText>
          </Link>
          <Link to="/">
            <ForgotPasswordText>비밀번호를 잊으셨나요?</ForgotPasswordText>
          </Link>
          <Linebreak isSmallScreen={isSmallScreen}>
            <Hr isSmallScreen={isSmallScreen} />
            <Or isSmallScreen={isSmallScreen}>또는</Or>
            <Hr isSmallScreen={isSmallScreen} />
          </Linebreak>
          <Border type="loginborder" text="instagram으로 계속"></Border>
        </Form>
      </LoginInner>
    </Wrapper>
  );
};

export default LoginItemDe;

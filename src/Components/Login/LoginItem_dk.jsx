import React, { useState } from "react";
import Logo from "../Logo";
import LogoTextMark from "../LogoTextMark";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { useMediaQuery } from "react-responsive";
import Border from "../Common/Border_dk";
import ReportModal from "./ReportModal";

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
  Error,
  Linebreak,
  StyledSpan,
} from "./RecycleStyles/login_dk";

import { signInWithEmailAndPassword } from "firebase/auth";

const LoginItemDk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // modal showing
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);

  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || id === "" || password === "") return;
    try {
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        id,
        password
      );

      // 로그인 성공 후 로컬 스토리지에 사용자 이메일과 비밀번호 저장
      // 차후에 복호화 예정
      const userEmail = userCredential.user.email;
      let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

      // 중복된 계정이 없도록 추가
      if (!storedAccounts.includes(userEmail)) {
        storedAccounts.push({ email: userEmail, password: password });
        localStorage.setItem("accounts", JSON.stringify(storedAccounts));
      }

      // 이동
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <BgImg $isSmallScreen={isSmallScreen} src="/login/thread_login_bg.png" />
      <LoginInner>
        <LogoWrapper $isSmallScreen={isSmallScreen}>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <LogoTextMark width={66} />
          <StyledSpan $isSmallScreen={isSmallScreen}>
            계정으로 로그인
          </StyledSpan>
        </LoginP>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="text" // 'id'는 유효한 input 타입이 아니므로 'text'로 수정
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
          <ForgotPasswordText>비밀번호를 잊으셨나요?</ForgotPasswordText>
          <Linebreak $isSmallScreen={isSmallScreen}>
            <Hr $isSmallScreen={isSmallScreen} />
            <Or $isSmallScreen={isSmallScreen}>또는</Or>
            <Hr $isSmallScreen={isSmallScreen} />
          </Linebreak>
          <Link to="/login-insta">
            <Border type="loginborder" text="instagram으로 계속"></Border>
          </Link>
          {error !== "" ? <Error>{error}</Error> : null}
        </Form>
        <button onClick={toggleShowing}>click</button>
      </LoginInner>
      <ReportModal
        width="100%"
        height="100%"
        background="rgba(255, 255, 255, 0.9)"
        borderRadius="20px"
        isVisible={showing}
      />
    </Wrapper>
  );
};

export default LoginItemDk;

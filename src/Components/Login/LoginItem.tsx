import React, { useState } from "react";
import Logo from "../Logo";
import LogoTextMark from "../LogoTextMark";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";

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
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginItem = () => {
  // const [emailPlaceholder, setEmailPlaceholder] = useState(
  //   "사용자 이름, 전화번호 또는 이메일 주소"
  // );
  // const [passwordPlaceholder, setPasswordPlaceholder] = useState("비밀번호");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    // if (name === "name") setName(value);
    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || id === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, id, password);
      // console.log(credentials.user);
      // await updateProfile(credentials.user, {
      //   displayName: name,
      // });

      navigate("/");

      // create an account
      // set the name of the user
      // redirect to the home page
      // 왜 비동기 처리가 필요한가?
      // => 너 되면, 너 되고, 너 되면 너 되자. 이렇게
    } catch (e) {
      // console.log(e);
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
      <BgImg src="/login/thread_login_bg.png" />
      <LoginInner>
        <LogoWrapper>
          <Logo width={40} />
        </LogoWrapper>
        <LoginP>
          <LogoTextMark width={62} />
          <span>계정으로 로그인</span>
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
        </Form>
      </LoginInner>
    </Wrapper>
  );
};

export default LoginItem;

import React, { useState } from "react";
import Logo from "../Logo";
import LogoTextMark from "../LogoTextMark";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useMediaQuery } from "react-responsive";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
  Error,
  // SingnUpText,
  // ForgotPasswordText,
} from "./RecycleStyles/login_dk";

const CreateAccountItemDk: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  // 제너릭 정의
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);

    const {
      target: { name, value },
    } = e;

    if (name === "id") setId(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || id === "" || password === "") return;

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        id,
        password
      );

      await updateProfile(credentials.user, {
        displayName: id,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
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
          <LogoTextMark width={62} />
          <span>계정 생성하기</span>
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
              placeholder=""
              required
              name="password"
              value={password}
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              type="submit"
              value={isLoading ? "Loading.." : "회원가입 하기"}
            />
          </InputWrapper>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </LoginInner>
    </Wrapper>
  );
};

export default CreateAccountItemDk;

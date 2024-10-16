import React, { useState } from "react";
import Logo from "../LoadingLogo/Logo";
import LogoTextMark from "../LoadingLogo/LogoTextMark";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { useMediaQuery } from "react-responsive";
import Border from "../Common/Border_dk";
import ReportModal from "./ReportModal";
import Loading from "../LoadingLogo/Loading";
import { EyeOpenIcon, EyeCloseIcon } from "../Common/Icon";
import styled from "styled-components";

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
  FooterMenuUl,
  FooterMenuLi,
} from "./RecycleStyles/login_dk";

import { signInWithEmailAndPassword } from "firebase/auth";

// 다은 추가 스타일 여기부터

const PasswordInput = styled.input`
  padding: 20px;
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #7e7e7e;
  box-shadow: 0 0 0 0 ${(props) => props.theme.loginInputSelectColor};
  transition: all 0.2s ease-in-out;
  margin-bottom: 24px;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    opacity: 0;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 2px ${(props) => props.theme.loginInputSelectColor};
  }
  &[type="submit"] {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: 1px solid ${(props) => props.theme.mouseHoverFontcolor};
    margin-bottom: 27px;
  }
  &.insta-btn {
    width: 100%;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #67b5fa;
    outline: none;
    border: none;
    padding: 0px;
    color: #fff;
    border-radius: 12px;
  }
`;
const EyeIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 28px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 28px;
    height: 28px;
    transition: fill 0.2s, stroke 0.2s; /* 부드러운 전환 효과 */
  }
  &:hover svg {
    fill: #000; /* 호버 시 색상 */
  }
`;
const CapsLockWarning = styled.div`
  color: red;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: end;
  margin-top: -12px;
  /* margin-bottom: 6px; */
`;
// 다은 추가 스타일 여기까지!

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

  // 다은 추가 부분 여기부터
  // 눈 아이콘 상태 변화
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Caps 켜져있을 때 상태 변화
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const handleCapsLock = (e) => {
    const isCaps = e.getModifierState && e.getModifierState("CapsLock");
    setIsCapsLockOn(isCaps); // CapsLock이 켜지면 true로 설정
  };
  // 다은 추가

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

      await signInWithEmailAndPassword(auth, id, password);

      // 로그인 성공 후 로컬 스토리지에 사용자 이메일과 비밀번호 저장
      let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
      const userEmail = auth.currentUser.email;

      // 중복된 계정이 없도록 이메일을 기준으로 추가
      const accountExists = storedAccounts.some(
        (account) => account.email === userEmail
      );

      if (!accountExists) {
        storedAccounts.push({ email: userEmail, password });
        localStorage.setItem("accounts", JSON.stringify(storedAccounts));
      }

      // 이동
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // Firebase 에러 처리
        switch (e.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("아이디나 비밀번호가 잘못되었습니다.");
            break;
          case "auth/invalid-email":
            setError("유효한 이메일을 입력하세요.");
            break;
          default:
            setError("아이디와 비밀번호를 확인해주세요.");
        }
      }
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const footerMenuList = [
    "© 2024",
    "Threads 약관",
    "개인정보처리방침",
    "쿠키정책",
    "문제 신고",
  ];

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
          {isLoading ? <Loading /> : null}

          <InputWrapper>
            <StyledInput
              onChange={onChange}
              type="text"
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
            <PasswordInput
              onChange={onChange}
              type={isPasswordVisible ? "text" : "password"} // 다은
              id="password"
              name="password"
              placeholder=""
              required
              value={password}
              onKeyDown={handleCapsLock} // 다은 캡스락
              onBlur={() => setIsCapsLockOn(false)} // 다은 캡스락
            />
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            {/* 다은 눈 아이콘 추가 */}
            {/* Eye 아이콘: 비밀번호가 보이는 경우 EyeCloseIcon, 보이지 않는 경우 EyeOpenIcon */}
            <EyeIconWrapper onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <EyeCloseIcon width="28px" />
              ) : (
                <EyeOpenIcon width="28px" />
              )}
            </EyeIconWrapper>
            {/* 다은 캡스락 추가 */}
            {isCapsLockOn && (
              <CapsLockWarning>Caps Lock이 켜져 있습니다.</CapsLockWarning>
            )}
            {/* 다은 캡스락 추가 */}
            {/* 다은 눈 아이콘 추가 */}
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
        <FooterMenuUl>
          {footerMenuList.map((menu, index) => (
            <FooterMenuLi
              key={index}
              onClick={() => {
                if (index === footerMenuList.length - 1) {
                  toggleShowing();
                }
              }}
            >
              {menu}
            </FooterMenuLi>
          ))}
        </FooterMenuUl>
      </LoginInner>
      <ReportModal
        width="100%"
        height="100vh"
        background="rgba(255, 255, 255, 0.9)"
        borderRadius="20px"
        isVisible={showing}
        setShowing={setShowing}
      />
    </Wrapper>
  );
};

export default LoginItemDk;

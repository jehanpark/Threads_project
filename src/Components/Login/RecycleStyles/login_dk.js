import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 15%);
  margin: 0 auto;
  color: ${(props) => props.theme.fontcolor};

  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

export const BgImg = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 533px;
  object-fit: cover;
  pointer-events: none;
`;

export const LoginInner = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 15%;
  width: 370px;
  height: 407px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
`;

export const LogoWrapper = styled.div`
  margin-bottom: 18px;
`;

export const LoginP = styled.p`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 16px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
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
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 21px;
  font-size: 14px;
  color: #7e7e7e;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  opacity: 1;
`;

export const SingnUpText = styled.p`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 13px;
`;

export const ForgotPasswordText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
    margin-left: 10px;
    text-decoration: none;
  }
`;

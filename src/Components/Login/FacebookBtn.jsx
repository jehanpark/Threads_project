import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

// import { auth } from "../firebase";
import { auth } from "../../firebase";

const Button = styled.span`
  width: 100%;
  background: #fff;
  color: #000;
  padding: 10px 20px;
  margin-top: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 50px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

const FacebookBtn = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const porvider = new GithubAuthProvider();
      await signInWithPopup(auth, porvider);
      // await signInWithRedirect(auth, porvider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" />
      페이스북으로 로그인
    </Button>
  );
};

export default FacebookBtn;

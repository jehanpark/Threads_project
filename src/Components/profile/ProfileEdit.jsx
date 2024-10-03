import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { UserIcon2 } from "../Common/Icon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth } from "../../firebase";
import { useRef, useState } from "react";
import Button from "../Common/Button";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PofileModalBox = styled.div`
  width: 450px;
  height: 530px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderWrapper};
  padding: 64px 11px 0 11px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  display: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "flex")};
  flex-direction: column;
  gap: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameInput = styled.input`
  background-color: inherit;
  border-bottom: 1px solid ${(props) => props.theme.navIconColor};
  width: 100%;
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const ImgBox = styled.label`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.mouseHoverBg};
`;

const ImgInput = styled.input`
  display: none;
`;

const Img = styled.img`
  width: 100%;
`;

const ProfileEdit = ({ open, close }) => {
  const nameInput = useRef();
  const user = auth.currentUser;
  const [avatar, setAvarta] = useState(user?.photoURL || null || undefined);
  const [name, setName] = useState(user?.displayName ?? "Anonymouse");

  const onImgchange = async (e) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert("5MD 미만의 이미지만 사용 가능합니다.");
        return;
      }
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvarta(avatarUrl);
      await updateProfile(user, { photoURL: avatarUrl });
      await console.log(avatarUrl);
    }
  };

  const onChange = async (e) => {
    if (!user) return;
    const inputValue = nameInput.current.value;
    if (inputValue === "" && inputValue === user.displayName) {
      return;
    } else if (inputValue !== user.displayName) {
      try {
        await updateProfile(user, {
          displayName: inputValue,
        });
        setName(inputValue);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  if (!open) return null;
  return (
    <>
      <ModalOverlay onClick={close}>
        <PofileModalBox
          isSmallScreen={isSmallScreen}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={close}>X</CloseButton>
          <Box style={{ height: "97px" }}>
            <Left style={{ width: "90%" }}>
              <SubTitle>이름</SubTitle>
              <NameInput
                ref={nameInput}
                placeholder={user?.displayName ?? "이과사의 친구"}
              />
            </Left>
            <ImgBox htmlFor="profileImg">
              {Boolean(avatar) ? (
                <Img src={avatar} />
              ) : (
                <UserIcon2 width="54" fill="#BABABA" />
              )}
            </ImgBox>
            <ImgInput
              id="profileImg"
              type="file"
              accept="image/*"
              onChange={onImgchange}
            />
          </Box>
          <Button
            text={"완료"}
            width={"100%"}
            heith={"40px"}
            type="edit"
            onClick={onChange}
          />
        </PofileModalBox>
      </ModalOverlay>
    </>
  );
};

export default ProfileEdit;

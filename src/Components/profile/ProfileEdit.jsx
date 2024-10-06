import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { UserIcon2 } from "../Common/Icon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth, db } from "../../firebase";
import { useEffect, useRef, useState } from "react";
import Button from "../Common/Button";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";

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

const Full = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Checkinner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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

const ProfileEdit = ({ open, close, profile, onProfileChange }) => {
  const [profileData, setProfileData] = useState(profile);
  const user = auth.currentUser;
  const [avatar, setAvarta] = useState(user?.photoURL || null || undefined);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      complete(); // Enter 키를 누르면 complete() 실행 후 모달 닫기
    } else if (e.key === "Escape") {
      close(); // ESC 키를 누르면 창 닫기
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

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
      setProfileData((prev) => ({
        ...prev,
        img: avatarUrl,
      }));

      await updateProfile(user, { photoURL: avatarUrl });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const complete = async () => {
    if (!user) return;
    try {
      const nameToSave = profileData.name
        ? profileData.name.trim()
        : profileData.name.trim();
      const bioToSave = profileData.bio
        ? profileData.bio.trim()
        : profileData.bio.trim();
      const imgToSave = profileData.img || user.photoURL || null;

      const profileQuery = query(
        collection(db, "profile"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(profileQuery);

      if (querySnapshot.empty) {
        await addDoc(collection(db, "profile"), {
          username: nameToSave,
          userId: user.uid,
          userEmail: user.email, // 나중에 파람즈 값과.. 바꿀필요가없구나?ㅋ
          bio: bioToSave,
          isLinkPublic: profileData.isLinkPublic,
          isProfilePublic: profileData.isProfilePublic,
          img: imgToSave, // 변경된 이미지 URL 추가
        });
      } else {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          username: nameToSave,
          userEmail: user.email,
          userId: user.uid,
          bio: bioToSave,
          isLinkPublic: profileData.isLinkPublic,
          isProfilePublic: profileData.isProfilePublic,
          img: imgToSave, // 변경된 이미지 URL 업데이트
        });
      }

      await updateProfile(user, {
        displayName: nameToSave,
      });

      onProfileChange({
        ...profileData,
        name: nameToSave,
        bio: bioToSave,
      });

      close(); // 모달 닫기
    } catch (e) {
      console.error(e);
    }
  };

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
                name="name"
                value={profileData.name}
                placeholder={user.displayName}
                onChange={handleInputChange}
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
          <Box style={{ height: "100px" }}>
            <Full>
              <SubTitle>자기소개</SubTitle>
              <NameInput
                name="bio"
                value={profileData.bio}
                placeholder={profileData.bio || "자기소개를 입력하세요"}
                onChange={handleInputChange}
              />
            </Full>
          </Box>
          <Box style={{ height: "60px" }}>
            <Checkinner>
              <SubTitle>연동 링크 공개</SubTitle>
              <input
                type="checkbox"
                name="isLinkPublic"
                checked={profileData.isLinkPublic}
                onChange={handleInputChange}
              />
            </Checkinner>
          </Box>
          <Box style={{ height: "60px" }}>
            <Checkinner>
              <SubTitle>비공개 프로필</SubTitle>
              <input
                type="checkbox"
                name="isProfilePublic"
                checked={profileData.isProfilePublic}
                onChange={handleInputChange}
              />
            </Checkinner>
          </Box>
          <Button
            text={"완료"}
            width={"100%"}
            heith={"40px"}
            type="edit"
            onClick={complete}
          />
        </PofileModalBox>
      </ModalOverlay>
    </>
  );
};

export default ProfileEdit;

// const complete = async (e) => {
//   if (!user) return;
//   const nameValue = nameInput.current.value;
//   if (nameValue === "" || nameValue === user.displayName) {
//     return;
//   } else if (nameValue !== user.displayName) {
//     try {
//       await updateProfile(user, {
//         displayName: inputValue,
//       });
//       setProfileData((data)=>({

//       }));
//     } catch (e) {
//       console.error(e);
//     }
//   }
// };

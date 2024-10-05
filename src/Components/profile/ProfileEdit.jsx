import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { UserIcon2 } from "../Common/Icon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth, db } from "../../firebase";
import { useEffect, useRef, useState } from "react";
import Button from "../Common/Button";
import { addDoc, collection, getDoc, updateDoc } from "firebase/firestore";

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

const ProfileEdit = ({ open, close, profile, onProfileChange }) => {
  const [profileData, setProfileData] = useState(profile);
  const bioValue = useRef();
  const user = auth.currentUser;
  const [avatar, setAvarta] = useState(user?.photoURL || null || undefined);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  const handleKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Enter") {
      complete();
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

  console.log(`user`);
  console.log(user);

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
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const complete = async () => {
    if (!user) return;
    try {
      await updateProfile(user, {
        displayName: profileData.name,
      });

      // 업데이트된 프로필 정보를 부모 컴포넌트로 전달
      // if (! getDoc(doc(db, "profile", userId)) === user.uid) {
      //   await addDoc(collection(db, "profile"), {
      //     username: user?.displayName || user.email,
      //     userId: user.uid,
      //     bio: bioValue.value,
      //   });
      // } else {
      //   updateDoc
      // }

      onProfileChange(profileData);

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
                placeholder={user?.displayName ?? "이과사의 친구"}
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
          <Box>
            <Left>
              <NameInput
                name="bio"
                ref={bioValue}
                value={formData.bio}
                onChange={handleInputChange} // 자기소개 변경
                placeholder="자기소개 입력"
              />
            </Left>
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

// const ProfileEdit = ({ open, close, profile, onProfileChange }) => {
//   const [formData, setFormData] = useState(profile); // 전달받은 프로필 정보로 초기 상태 설정

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: type === "checkbox" ? checked : value, // 입력 필드와 체크박스 처리
//     }));
//   };

//   const complete = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       // Firebase에서 사용자 프로필 업데이트 (이름, bio 등)
//       await updateProfile(user, {
//         displayName: formData.name,
//         // bio나 공개 설정 같은 다른 필드도 저장해야 하면 Firestore 등에 추가
//       });

//       // 업데이트된 프로필 정보를 부모 컴포넌트로 전달
//       onProfileChange(formData);

//       close(); // 모달 닫기
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Escape" || e.key === "Enter") {
//       complete();
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       window.addEventListener("keydown", handleKeyDown);
//     }
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [open]);

//   if (!open) return null;

//   return (
//     <ModalOverlay onClick={close}>
//       <PofileModalBox onClick={(e) => e.stopPropagation()}>
//         <CloseButton onClick={close}>X</CloseButton>
//         <Box>
//           <Left>
//             <SubTitle>이름</SubTitle>
//             <NameInput
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange} // 이름 변경
//               placeholder="이름 입력"
//             />
//           </Left>

//

//           <Left>
//             <SubTitle>링크 공개</SubTitle>
//             <input
//               type="checkbox"
//               name="isLinkPublic"
//               checked={formData.isLinkPublic}
//               onChange={handleInputChange} // 링크 공개 여부 변경
//             />
//           </Left>

//           <Left>
//             <SubTitle>프로필 공개</SubTitle>
//             <input
//               type="checkbox"
//               name="isProfilePublic"
//               checked={formData.isProfilePublic}
//               onChange={handleInputChange} // 프로필 공개 여부 변경
//             />
//           </Left>

//           <Button
//             text="완료"
//             width="100%"
//             height="40px"
//             type="edit"
//             onClick={complete} // 완료 버튼 클릭 시 호출
//           />
//         </Box>
//       </PofileModalBox>
//     </ModalOverlay>
//   );
// };

// export default ProfileEdit;

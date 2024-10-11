import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { UserIcon2 } from "../Common/Icon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth, db } from "../../firebase";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Button from "../Common/Button";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
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
  background: ${(props) => props.theme.headerBg};
  padding: 64px 11px 0 11px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.headerBg};
    padding: 40% 20px;
  }
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
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: ${(props) => props.theme.borderColor};
  margin-bottom: 10px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameInput = styled.input`
  background-color: inherit;
  border-bottom: 1px solid ${(props) => props.theme.nomalIconColor};
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
const Img = styled.img`
  width: 100%;
`;

const ImgInput = styled.input`
  display: none;
`;

const ProfileEdit = React.memo(({ open, close, profile, onProfileChange }) => {
  const [profileData, setProfileData] = useState({ ...profile }); //전체적인 프로필 내용
  const [inputData, setInputDate] = useState({}); //>> 인풋 값을 받을 state
  const user = auth.currentUser; //유저 계정 내용 ( displayName , email , photoURL  , uid)
  const [avatar, setAvarta] = useState(user?.photoURL || ""); // 유저의 이미지를 변경할 state
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" }); // 미디어 쿼리

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     complete();
  //   } else if (e.key === "Escape") {
  //     close();
  //   }
  // };

  // useEffect(() => {
  //   if (open) {
  //     window.addEventListener("keydown", handleKeyDown);
  //   }
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [open]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      value === "" ? profile[name] : type === "checkbox" ? checked : value;
    setInputDate((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
    if (type === "checkbox") {
      setProfileData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const onImgchange = async (e) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert("5MD 미만의 이미지만 사용 가능합니다.");
        return;
      }
      const locationRef = ref(storage, `avatars/${user?.uid}}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvarta(avatarUrl);
      //console.log(avatar); << 잘나옴
      await updateProfile(user, { photoURL: avatar });
    } else return;
  };

  const complete = async () => {
    if (!user) return;
    try {
      console.log("Uploaded avatar URL:");
      console.log(avatar);
      const nameToSave =
        inputData.username || profile.username || user.displayName;
      const bioToSave = inputData.bio || profile.bio || "";
      const imgToSave = avatar || "";
      const profileQuery = query(
        collection(db, "profile"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(profileQuery);
      if (querySnapshot.empty) {
        console.log("빔");
        console.log(imgToSave);
        console.log(nameToSave);
        console.log(bioToSave);
        const newDocRef = await addDoc(collection(db, "profile"), {
          username: nameToSave,
          userId: user.uid,
          userEmail: user.email,
          bio: bioToSave,
          isLinkPublic: profileData.isLinkPublic,
          isProfilePublic: profileData.isProfilePublic,
          img: imgToSave,
        });

        // postId 업데이트
        await updateDoc(newDocRef, { postId: newDocRef.id });
      } else {
        console.log("안빔");
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        await updateDoc(docRef, {
          username: nameToSave,
          userId: user.uid,
          userEmail: user.email,
          bio: bioToSave,
          isLinkPublic: profileData.isLinkPublic,
          isProfilePublic: profileData.isProfilePublic,
          img: imgToSave,
        });
      }
      // auth 정보 수정
      await updateProfile(user, {
        displayName: nameToSave,
        photoURL: avatar,
      });
      //여기에 있는 profile state값 변경
      setProfileData({
        ...profileData,
        name: nameToSave,
        bio: bioToSave,
        img: avatar,
      });
      // onProfileChange({
      //   ...profileData,
      //   name: nameToSave,
      //   bio: bioToSave,
      //   img: avatar,
      // });
      close();
    } catch (e) {
      console.log("업뎃 에러");
      console.log(e);
      console.log("업뎃 에러");
    }
  };

  // const CheckProfile = async () => {
  //   try {
  //     const profileQuery = query(
  //       collection(db, "profile"),
  //       where("userEmail", "==", emailAdress)
  //     );
  //     const unsubscribe = onSnapshot(profileQuery, (querySnapshot) => {
  //       //db에 firebase에 사람이 있다면 ?
  //       if (!querySnapshot.empty) {
  //         const profileDoc = querySnapshot.docs[0].data(); //이메일이 프로필db에 있는 사람의 데이터.
  //         const imgUrl = profileDoc.img;
  //         // const imgUrl = ref(storage, `avatars/${profileDoc.userId}`);

  //         // 에러
  //         setAvarta(imgUrl);
  //         //유저 정보가 있다면
  //         if (!profileDoc.empty) {
  //           setProfileData((prev) => ({
  //             ...prev,
  //             postId: profileDoc.postId,
  //             username: profileDoc.username,
  //             userEmail: profileDoc.userEmail,
  //             bio: profileDoc.bio,
  //             isLinkPublic: profileDoc.isLinkPublic,
  //             isProfilePublic: profileDoc.isProfilePublic,
  //             img: imgUrl,
  //           }));
  //           console.log(profile);
  //           console.log("있다");
  //         }
  //       } else {
  //         // 사람이 없다면?
  //         console.log("음따");
  //         console.log(profile);
  //         setProfileData((prev) => ({
  //           ...prev,
  //           postId: "",
  //           username: emailAdress,
  //           userEmail: emailAdress,
  //           bio: "",
  //           isLinkPublic: true,
  //           isProfilePublic: true,
  //           img: null,
  //         }));
  //       }
  //     });
  //     return () => unsubscribe();
  //   } catch (error) {
  //     console.error("Error fetching profile: ", error);
  //   }
  // };

  // useEffect(() => {
  //   CheckProfile();
  // }, []);

  console.log(profileData.isLinkPublic);

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
                name="username"
                placeholder={user.displayName || user.email}
                onKeyUp={handleInputChange}
              />
            </Left>
            <ImgBox htmlFor="profileImg">
              {avatar !== null ? (
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
                placeholder={profileData.bio || "자기소개를 입력하세요"}
                onKeyUp={handleInputChange}
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
});

export default ProfileEdit;

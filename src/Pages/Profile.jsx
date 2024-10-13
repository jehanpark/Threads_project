import React, { useState, useContext, useEffect } from "react";
import {
  ThreadDispatchContext,
  ThreadDataContext,
} from "../Contexts/ThreadContext";
import { auth, storage, db } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Button from "../Components/Common/Button";
import Modal from "../Components/Common/Modal";
import Post from "../Components/Post";
import {
  InstaIcon,
  PlusIcon,
  FacebookIcon,
  UserIcon2,
} from "../Components/Common/Icon";
import {
  ProfileInnner,
  IdWrap,
  IdText,
  Tap,
  TextInput,
  Desk,
} from "../styles/MobileProfile";
import FollowModal from "../Components/profile/FollowModal";
import LinkPluse from "../Components/profile/LinkPluse";
import ProfileEdit from "../Components/profile/ProfileEdit";
import TimeLine from "../Components/TimeLine";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtherBtnModal from "../Components/profile/OtherBtnModal";

import { useAuth } from "../Contexts/AuthContext";

const BoederWrapper = styled.div`
  margin: 0 auto;
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  /* background: ${(props) => props.theme.borderWrapper}; */
  background: ${(props) => props.theme.headerBg};
  box-shadow: ${(props) => props.theme.bordershadow};
  padding: 10px 0;
  @media (max-width: 768px) {
    border-radius: 0;
    width: 100vw;
    height: calc(100% - 140px);
    box-shadow: none;
    margin: 0px;
    border-radius: 0px;
    background: ${(props) => props.theme.headerBg};
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ImgWrap = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 50px;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
`;

const Nick = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => props.theme.fontcolor};
`;

const BottomWrap = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  gap: 25px;
  @media screen and (max-width: 768px) {
    gap: 8px;
  }
`;

const FollowLink = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Follow = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.nomalIconColor};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const LinkPlus = styled.div`
  border: 1px solid ${(props) => props.theme.nomalIconColor};
  border-radius: 50px;
  width: 24px;
  height: 24px;
  text-align: center;
  path {
    stroke: ${(props) => props.theme.nomalIconColor};
  }
`;

const PulsLinkIcon = styled.div`
  width: 50px;
  height: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  path {
    width: 22px;
    height: 22px;
    text-align: center;
    stroke: ${(props) => props.theme.fontcolor};
  }
`;

const ThreadInner = styled.div`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
  }
  button {
    flex: 0 0 auto;
    width: 130px;
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: all;
    @media (max-width: 768px) {
      width: 90px;
      padding: 8px 15px;
    }
    @media (max-width: 480px) {
      width: 80px;
      padding: 6px 10px;
    }
  }
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px;
`;

const Profile = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const user = auth.currentUser; //유저정보

  const [avatar, setAvarta] = useState(null || undefined); //이미지관리목적
  const [posts, setPosts] = useState([]); //데이터베이스에 객체형태로 정의된 데이터들
  const [editbtn, setEditbtn] = useState(true);
  // searchParams = email 받아오기
  const [searchParams] = useSearchParams();
  const emailAdress = searchParams.get("email");
  //console.log(emailAdress);

  const data = useContext(ThreadDataContext);
  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  useEffect(() => {
    if (!currentUser) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/login"); // "예"를 누르면 로그인 페이지로 이동
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  const { createThread, updateThread, deleteThread, updateProfile } =
    useContext(ThreadDispatchContext);
  const [lastemail, setLastEmail] = useState("");
  //모달관련 state
  const [followModal, setFollowModal] = useState(false);
  const [linkmodal, setLinkModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [otherBtn, setOtherBtn] = useState(false);
  const [profile, setProfile] = useState({
    postId: "",
    username: "",
    userId: "",
    userEmail: "",
    bio: "",
    isLinkPublic: true,
    isProfilePublic: true,
    img: `${avatar ?? ""}`,
  });

  const [savedData, setSavedData] = useState([]); // 모든 데이터를 저장
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 저장
  const [contentType, setContentType] = useState("all"); // 선택된 필터 상태
  // NotificationList에서 데이터를 받아옴
  const handleDataUpdate = (listData) => {
    if (listData.length > 0) {
      setSavedData(listData); // 전체 데이터를 저장
      setFilteredData(listData); // 필터링 없이 모든 데이터를 먼저 보여줌
    }
  };

  const buttonCheck = () => {
    if (user?.email === emailAdress) {
      setEditbtn(true);
    } else {
      setEditbtn(false);
    }
  };

  const CheckProfile = async () => {
    try {
      const profileQuery = query(
        collection(db, "profile"),
        where("userEmail", "==", emailAdress)
      );
      const unsubscribe = onSnapshot(profileQuery, (querySnapshot) => {
        //db에 firebase에 사람이 있다면 ?
        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0].data(); //이메일이 프로필db에 있는 사람의 데이터.
          const imgUrl = profileDoc.img;
          // const imgUrl = ref(storage, `avatars/${profileDoc.userId}`);

          // 에러
          setAvarta(imgUrl);
          //유저 정보가 있다면
          if (!profileDoc.empty) {
            setProfile((prev) => ({
              ...prev,
              postId: profileDoc.postId,
              username: profileDoc.username,
              userEmail: profileDoc.userEmail,
              bio: profileDoc.bio,
              isLinkPublic: profileDoc.isLinkPublic,
              isProfilePublic: profileDoc.isProfilePublic,
              img: imgUrl,
            }));
            console.log(profile);
            console.log("있다");
          }
        } else {
          // 사람이 없다면?
          console.log("음따");
          console.log(profile);
          setProfile((prev) => ({
            ...prev,
            postId: "",
            username: emailAdress,
            userEmail: emailAdress,
            bio: "",
            isLinkPublic: true,
            isProfilePublic: true,
            img: null,
          }));
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    CheckProfile();
    buttonCheck();
  }, []);

  const onfollow = () => {
    setFollowModal((prev) => !prev);
    //팔로우 클릭
  };

  const onLinkPlus = () => {
    setLinkModal((prev) => !prev);
    //아이콘추가
  };

  const onProfileEdite = () => {
    setEditModal((prev) => !prev);
    //프로필수정모달
  };

  const onOtherbtn = () => {
    setOtherBtn((prev) => !prev);
    //프로필수정모달
  };
  const fetchPosts = async () => {
    //하단에 띄울 쓰레드 탭에 쓰래드 state 관리 함수
    const postQuery = query(
      collection(db, "contents"),
      where("email", "==", emailAdress), //파람즈 값으로 변경하자
      orderBy("createdAt", "desc"),
      limit(15)
    );
    const snapShot = await getDocs(postQuery); //필터된 포스터 가져옴
    const post = snapShot.docs.map((doc) => {
      const { createdAt, email, photos, post, userId, username, videos } =
        doc.data();
      return {
        createdAt,
        email,
        photos,
        post,
        userId,
        username,
        videos,
      };
    });
    setPosts(post);
  };

  const handleProfileChange = (updatedProfile) => {
    console.log("확인");
    console.log(profile);
    setProfile(updatedProfile);
  };

  // 필터링
  const filterList = (type) => {
    if (type === "thresds") {
      setFilteredData(savedData);
    } else {
      const filtered = savedData.filter((item) => item.type === type); // 타입에 따른 필터링
      setFilteredData(filtered);
    }
  };
  // 버튼 클릭 시 필터링 적용
  const handleButtonClick = (type) => {
    setContentType(type); // 필터 상태 업데이트
    filterList(type); // 필터링 적용
  };

  const getButtonStyle = (type) => ({
    background: "#fff",
    color: contentType === type ? "#000" : "rgba(204, 204, 204, 0.8)",
    borderBottom: contentType === type ? "1.5px solid #000" : "none",
  });

  const buttons = [
    { label: "스레드", type: "thresds" },
    { label: "답글", type: "comment" },
    { label: "사진", type: "photo" },
    { label: "동영상", type: "media" },
  ];
  console.log(profile);
  return (
    <BoederWrapper>
      {followModal ? (
        <FollowModal open={true} close={onfollow} />
      ) : (
        <FollowModal open={false} close={onfollow} />
      )}
      {linkmodal ? (
        <LinkPluse open={true} close={onLinkPlus} />
      ) : (
        <LinkPluse open={false} close={onLinkPlus} />
      )}
      {editmodal ? (
        <ProfileEdit
          open={true}
          close={onProfileEdite}
          profile={profile}
          onProfileChange={handleProfileChange}
        />
      ) : (
        <ProfileEdit
          open={false}
          close={onProfileEdite}
          profile={profile}
          onProfileChange={handleProfileChange}
        />
      )}
      {otherBtn ? (
        <OtherBtnModal open={true} close={onOtherbtn} profile={profile} />
      ) : (
        <OtherBtnModal open={false} close={onOtherbtn} profile={profile} />
      )}
      <>
        <ProfileInnner isSmallScreen={isSmallScreen}>
          <ProfileWrap>
            <IdWrap isSmallScreen={isSmallScreen}>
              <Nick> {profile.username}</Nick>
              <IdText isSmallScreen={isSmallScreen}>{emailAdress}</IdText>
            </IdWrap>
            <ImgWrap isSmallScreen={isSmallScreen}>
              {Boolean(avatar) ? (
                <Img src={avatar} />
              ) : (
                <UserIcon2 width="54" fill="#BABABA" />
              )}
            </ImgWrap>
          </ProfileWrap>
          <BottomWrap>
            <Desk isSmallScreen={isSmallScreen}>
              {profile.bio ?? "프로필을 꾸며보세요!"}
            </Desk>
            <FollowLink>
              <Follow onClick={onfollow}>팔로워 1234</Follow>
              {profile.isLinkPublic ? (
                <Links>
                  {user?.email === emailAdress ? (
                    <LinkPlus onClick={onLinkPlus}>
                      <PlusIcon width="16px" />
                    </LinkPlus>
                  ) : null}

                  <PulsLinkIcon>
                    <InstaIcon />
                    <FacebookIcon />
                  </PulsLinkIcon>
                </Links>
              ) : null}
            </FollowLink>
            {user?.email === emailAdress ? (
              <Button type="edit" text="프로필 수정" onClick={onProfileEdite} />
            ) : (
              <Button type="edit" text="팔로잉" onClick={onOtherbtn} />
            )}
          </BottomWrap>
        </ProfileInnner>
        <ThreadInner>
          <ButtonGroup>
            {buttons.map((button) => (
              <button
                key={button.type}
                style={getButtonStyle(button.type)}
                onClick={() => handleButtonClick(button.type)}
              >
                {button.label}
              </button>
            ))}
          </ButtonGroup>
          <PostWrap>
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </PostWrap>
        </ThreadInner>
      </>
    </BoederWrapper>
  );
};

export default Profile;

{
  /* <Nick> {profile.username ?? user.uid ?? emailAdress}</Nick> */
}

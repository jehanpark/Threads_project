import React, { useState, useContext, useEffect } from "react";
import { ThreadDispatchContext } from "../Contexts/ThreadProvider";
import { ThreadDataContext } from "../Contexts/ThreadProvider";
import { auth, storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Profileimg from "../../public/profile.png";
import Border from "../Components/Common/Border";
import Button from "../Components/Common/Button";
import Modal from "../Components/Common/Modal";
import Post from "../Components/Post";
import {
  PlusIcon,
  InstaIcon,
  FacebookIcon,
  UserIcon1,
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
`;

const FollowLink = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Follow = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.nomalIconColor};
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
  width: 150px;
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

const Circle = styled.div`
  border-radius: 50px;
  width: 24px;
  height: 24px;
  background: ${(props) => props.theme.nomalIconColor};
`;

const ThreadInner = styled.div`
  width: 100%;
`;

// const Tap = styled.div`
//   width: 100%;
//   height: 48px;
//   border-radius: 18px;
//   background: ${(props) => props.theme.borderColor};
//   display: flex;
//   justify-content: space-between;
//   text-align: center;
//   line-height: 3;
//   margin-bottom: 8px;
//   div {
//     height: 100%;
//     width: 168px;
//     color: ${(props) => props.theme.nomalIconColor};
//   }
// `;

// const TextInput = styled.div`
//   padding: 40px 40px 0 40px;
//   width: 100%;
//   height: 68px;
//   border-radius: 18px;
//   background: ${(props) => props.theme.borderColor};
// `;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding: 0 10px;
  width: 654px;
  margin: 0 auto;
  border: 1px solid #f00;
`;

const Profile = () => {
  const user = auth.currentUser; //유저정보
  const [avatar, setAvarta] = useState(user?.photoURL || null || undefined); //이미지관리목적
  const [posts, setPosts] = useState([]); //데이터베이스에 객체형태로 정의된 데이터들
  const [name, setName] = useState(user?.displayName ?? "Anonymouse"); // 이름 state관리
  const [editMode, setEditMode] = useState(false); //프로필수정기능 끄고키기

  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const data = useContext(ThreadDataContext);
  const { createThread, updateThread, deleteThread, updateProfile } =
    useContext(ThreadDispatchContext);
  const [lastemail, setLastEmail] = useState("");
  //모달관련 state
  const [followModal, setFollowModal] = useState(false);
  const [linkmodal, setLinkModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);

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

  const fetchPosts = async () => {
    //하단에 띄울 쓰레드 스테이트 관리 함수
    const postQuery = query(
      collection(db, "contents"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(15)
    );

    const snapShot = await getDocs(postQuery); //필터된 포스터 가져옴
    const post = snapShot.docs.map((doc) => {
      const { createdAt, photos, video, post, userId, username } = doc.data();
      return {
        id: doc.id,
        createdAt,
        photos: photos || [],
        video,
        post,
        userId,
        username,
      };
    });
    setPosts(post);
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, [posts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const useEmailIndex = user.email.indexOf("@");
    const userEmail = user.email.substring(0, useEmailIndex);
    // const userEmail = user.email;
    setLastEmail(userEmail);
  }, []);

  return (
    // <Border type="borderWrapper">
    <>
      <ProfileInnner isSmallScreen={isSmallScreen}>
        <ProfileWrap>
          <IdWrap isSmallScreen={isSmallScreen}>
            <Nick> {user?.displayName ?? "이과사의 친구"}</Nick>
            <IdText isSmallScreen={isSmallScreen}>
              {user?.email ? lastemail : "임시"}
            </IdText>
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
          <Desk isSmallScreen={isSmallScreen}>확인용 문구</Desk>
          <FollowLink>
            {followModal ? (
              <FollowModal open={true} close={onfollow} />
            ) : (
              <FollowModal open={false} close={onfollow} />
            )}
            <Follow onClick={onfollow}>팔로워 00</Follow>
            <Links>
              {linkmodal ? (
                <LinkPluse open={true} close={onLinkPlus} />
              ) : (
                <LinkPluse open={false} close={onLinkPlus} />
              )}
              <LinkPlus onClick={onLinkPlus}>
                <PlusIcon width="16px" />
              </LinkPlus>
              <PulsLinkIcon>
                <Circle />
                <Circle />
                <Circle />
                <InstaIcon />
                <FacebookIcon />
              </PulsLinkIcon>
            </Links>
          </FollowLink>
          {editmodal ? (
            <ProfileEdit open={true} close={onProfileEdite} />
          ) : (
            <ProfileEdit open={false} close={onProfileEdite} />
          )}
          <Button type="edit" text="프로필 수정" onClick={onProfileEdite} />
        </BottomWrap>
      </ProfileInnner>
      <ThreadInner>
        <Tap isSmallScreen={isSmallScreen}>
          <li>스레드</li>
          <li>답글</li>
          <li>리포트</li>
          <li>인스타</li>
        </Tap>
        <TextInput isSmallScreen={isSmallScreen} />
        <PostWrap>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </PostWrap>
      </ThreadInner>
    </>
    //</Border>
  );
};

export default Profile;

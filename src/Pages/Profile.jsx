import React, { useState, useContext } from "react";
import { ThreadDispatchContext } from "../Contexts/ThreadProvider";
import { ThreadDataContext } from "../Contexts/ThreadProvider";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Profileimg from "../../public/profile.png";
import Border from "../Components/Common/Border";
import Button from "../Components/Common/Button";
import Modal from "../Components/Common/Modal";
import { PlusIcon, InstaIcon, FacebookIcon } from "../Components/Common/Icon";
import {
  ProfileInnner,
  IdWrap,
  IdText,
  Tap,
  TextInput,
  Desk,
} from "../styles/MobileProfile";

// const ProfileInnner = styled.div`
//   padding: 40px 40px 0 40px;
//   width: 100%;
//   height: 320px;
//   border-radius: 40px 40px 18px 18px;
//   background: ${(props) => props.theme.borderColor};
//   margin-bottom: 8px;
// `;
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
// const Desk = styled.div`
//   height: 83px;
//   color: ${(props) => props.theme.fontcolor};
// `;

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

const ModalItemLine = styled.div`
  padding: 20px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderstroke};
  border-radius: 15px;
  height: 87px;
`;

const ModalMainText = styled.h3`
  margin-bottom: 6px;
`;

const Tdiv = styled.div`
  padding: 40px 40px 0 40px;
  width: 654px;
  margin: 0 auto 8px;
  height: 200px;
  border-radius: 18px;
  background: ${(props) => props.theme.borderColor};
  color: #000;
`;

const Profile = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const data = useContext(ThreadDataContext);

  const { createThread, updateThread, deleteThread, updateProfile } =
    useContext(ThreadDispatchContext);
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
    //프로필수정
  };

  return (
    // <Border type="borderWrapper">
    <>
      <ProfileInnner isSmallScreen={isSmallScreen}>
        <ProfileWrap>
          <IdWrap isSmallScreen={isSmallScreen}>
            <Nick>이과사</Nick>
            <IdText isSmallScreen={isSmallScreen}>Prince</IdText>
          </IdWrap>
          <ImgWrap isSmallScreen={isSmallScreen}>
            <Img src={Profileimg} />
          </ImgWrap>
        </ProfileWrap>
        <BottomWrap>
          <Desk isSmallScreen={isSmallScreen}>확인용 문구</Desk>
          <FollowLink>
            {followModal ? (
              <Modal isOpen={true} onClose={onfollow}></Modal>
            ) : (
              <Modal isOpen={false} onClose={onfollow}></Modal>
            )}
            <Follow onClick={onfollow}>팔로워 00</Follow>
            <Links>
              {linkmodal ? (
                <Modal isOpen={true} onClose={onLinkPlus} height={"200px"}>
                  <ModalItemLine>
                    <ModalMainText>링크 추가</ModalMainText>
                    <input
                      style={{
                        width: "100%",
                        borderBottom: ` 1px solid ${(props) =>
                          props.theme.borderstroke}`,
                        outline: "none",
                      }}
                    />
                  </ModalItemLine>
                </Modal>
              ) : (
                <Modal isOpen={false} onClose={onLinkPlus}></Modal>
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
            <Modal isOpen={true} onClose={onProfileEdite}></Modal>
          ) : (
            <Modal isOpen={false} onClose={onProfileEdite}></Modal>
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
        <Tdiv>
          {data[0].userId} {data[0].nickname} {data[0].desc}
        </Tdiv>
      </ThreadInner>
    </>
    //</Border>
  );
};

export default Profile;

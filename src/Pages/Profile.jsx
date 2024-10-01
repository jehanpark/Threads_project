import React, { useState, useContext } from "react";
import { ThreadDispatchContext } from "../Contexts/ThreadProvider";
import { ThreadDataContext } from "../Contexts/ThreadProvider";
import styled from "styled-components";
import Profileimg from "../../public/profile.png";
import Border from "../Components/Common/Border";
import Button from "../Components/Common/Button";
import Modal from "../Components/Common/Modal";
import { PlusIcon, InstaIcon, FacebookIcon } from "../Components/Common/Icon";

const ProfileInnner = styled.div`
  padding: 40px 40px 0 40px;
  width: 100%;
  height: 320px;
  border-radius: 40px 40px 18px 18px;
  background: ${(props) => props.theme.borderColor};
  margin-bottom: 8px;
`;
const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const IdWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const IdText = styled.h3`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.nomalIconColor};
`;

const BottomWrap = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const Desk = styled.div`
  height: 83px;
  color: ${(props) => props.theme.fontcolor};
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

const Tap = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 18px;
  background: ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 3;
  margin-bottom: 8px;
  div {
    height: 100%;
    width: 168px;
    color: ${(props) => props.theme.nomalIconColor};
  }
`;

const TextInput = styled.div`
  padding: 40px 40px 0 40px;
  width: 100%;
  height: 68px;
  border-radius: 18px;
  background: ${(props) => props.theme.borderColor};
`;

const Profile = () => {
  const data = useContext(ThreadDataContext);
  const { createThread, updateThread, deleteThread, updateProfile } =
    useContext(ThreadDispatchContext);

  const [linkmodal, setLinkModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [followModal, setFollowModal] = useState(false);

  const onLinkPlus = () => {
    setLinkModal((prev) => !prev);
  };

  const onProfileEdite = () => {
    setEditModal((prev) => !prev);
  };
  const onfollow = () => {
    setFollowModal((prev) => !prev);
  };

  return (
    <Border type="borderWrapper">
      <ProfileInnner>
        <ProfileWrap>
          <IdWrap>
            <Nick>이과사</Nick>
            <IdText>Prince</IdText>
          </IdWrap>
          <ImgWrap>
            <Img src={Profileimg} />
          </ImgWrap>
        </ProfileWrap>
        <BottomWrap>
          <Desk>확인용 문구</Desk>
          <FollowLink>
            <Follow onClick={onfollow}>팔로워 00</Follow>
            <Links>
              {linkmodal ? <Modal isOpen /> : <Modal onClose />}
              <LinkPlus onClick={onLinkPlus}>
                {editmodal ? <Modal isOpen /> : <Modal onClose />}
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
          {followModal ? <Modal isOpen /> : <Modal onClose />}
          <Button type="edit" text="프로필 수정" onClick={onProfileEdite} />
        </BottomWrap>
      </ProfileInnner>
      <Tap>
        <div>스레드</div>
        <div>답글</div>
        <div>리포트</div>
        <div>인스타</div>
      </Tap>
      <TextInput />
    </Border>
  );
};

export default Profile;

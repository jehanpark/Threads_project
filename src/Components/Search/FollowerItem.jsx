import React from "react";
import styled from "styled-components";
import { UserIcon2 } from "../Common/Icon";

const FollowerContain = styled.div`
  width: 590px;
  max-width: 590px;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  border-radius: 20px;
  background: ${(props) => props.theme.borderColor};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const UserWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #f00;

  img {
    width: 100%;
    border-radius: 50%;
  }
`;

const UserContex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: 800;
  color: ${(props) => props.theme.fontcolor};

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const UserInfo = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.followerfont};

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const UserFollowerNum = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.fontcolor};

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const FollowerButton = styled.button`
  width: 100px;
  border-radius: 8px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  background: ${(props) => (props.isFollowing ? "#000" : "#fff")};
  color: ${(props) => (props.isFollowing ? "#fff" : "#000")};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 90px;
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    width: 80px;
    padding: 6px 10px;
  }
`;

const FollowerItem = ({
  nickname,
  profileImg,
  desc,
  followers,
  isFollowing,
  toggleFollow,
}) => {
  return (
    <FollowerContain>
      <Wrapper>
        <UserWrapper>
          {profileImg ? (
            <img src={profileImg} alt="User profile" />
          ) : (
            <UserIcon2 width={50} height={50} />
          )}
        </UserWrapper>
        <UserContex>
          <UserName>{nickname}</UserName>
          <UserInfo>{desc}</UserInfo>
          <UserFollowerNum>{`팔로워 ${followers}명`}</UserFollowerNum>
        </UserContex>
      </Wrapper>
      <FollowerButton isFollowing={isFollowing} onClick={toggleFollow}>
        {isFollowing ? "팔로잉" : "팔로우"}
      </FollowerButton>
    </FollowerContain>
  );
};

export default FollowerItem;

import React from "react";
import styled from "styled-components";

const FollowerContain = styled.div`
  border: 1px solid #f00;
  width: 590px;
  max-width: 590px;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  margin-top: 40px;

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
  width: 100%;
  display: flex;
  gap: 20px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const UserContex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 10px 0;

  @media (max-width: 480px) {
    padding: 5px 0;
  }
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
  width: 110px;
  border-radius: 8px;
  padding: 10px 20px;
  background: ${(props) => (props.isFollowing ? "#000" : "#fff")};
  color: ${(props) => (props.isFollowing ? "#fff" : "#000")};
  font-weight: 700;
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
          <img src={profileImg} alt="User profile" width={60} />
        </UserWrapper>
        <UserContex>
          <UserName>{nickname}</UserName>
          <UserInfo>{desc}</UserInfo>
          <UserFollowerNum>{`팔로워 ${followers.length}명`}</UserFollowerNum>
        </UserContex>
      </Wrapper>
      <FollowerButton isFollowing={isFollowing} onClick={toggleFollow}>
        {isFollowing ? "팔로잉" : "팔로우"}
      </FollowerButton>
    </FollowerContain>
  );
};

export default FollowerItem;

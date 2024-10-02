import React, { useState } from "react";
import Button from "../Common/Button";
import styled from "styled-components";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "../../styles/GlobalStyles.styles";
import { UserIcon2 } from "../Common/Icon";

const FollowerContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  path {
    fill: ${(props) => props.theme.followerfont};
  }
`;

const UserContex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 10px 0;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: 800;
  color: ${(props) => props.theme.fontcolor};
`;

const UserInfo = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.followerfont};
`;

const UserFollowerNum = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.fontcolor};
`;

const FollowerItem = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const ClickFollower = () => {
    console.log("hi");
    setIsFollowing((current) => !current);
    console.log(isFollowing);
  };

  return (
    <FollowerContain>
      <Wrapper>
        <UserWrapper>
          <UserIcon2 width={60} />
        </UserWrapper>
        <UserContex>
          <UserName>User1</UserName>
          <UserInfo>노래하는 피티</UserInfo>
          <UserFollowerNum>팔로워 4.2만명</UserFollowerNum>
        </UserContex>
      </Wrapper>
      <Button
        type="follow"
        text={isFollowing ? "팔로잉" : "팔로우"}
        background={isFollowing ? "#fff" : "#000"}
        onClick={ClickFollower}
      />
    </FollowerContain>
  );
};

export default FollowerItem;

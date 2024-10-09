import React from "react";
import styled from "styled-components";
import FollowerItem from "./FollowerItem";

const ErrorInfo = styled.p`
  margin-bottom: 10px;
  margin-top: 30px;
`;

const FollowersList = ({ followers }) => {
  if (!followers || followers.length === 0) {
    return <ErrorInfo>팔로워 데이터를 찾을 수 없습니다.</ErrorInfo>;
  }

  return (
    <div>
      {followers.map((follower) => (
        <FollowerItem
          key={follower.id}
          nickname={follower.username}
          profileImg={follower.profileImg}
          desc={follower.bio}
          followers={follower.followers}
          isFollowing={follower.isFollowing}
          toggleFollow={() => console.log("팔로우 상태 변경", follower.id)}
        />
      ))}
    </div>
  );
};

export default FollowersList;

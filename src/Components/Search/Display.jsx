import React from "react";
import styled from "styled-components";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  Coment,
  UserIcon2,
} from "../Common/Icon";

const Wrapper = styled.div`
  width: 590px;
  max-width: 590px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  margin-left: 50px;
`;

const Photo = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  margin-left: 0px;
  margin-top: 8px;
  border-radius: 8px;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;

const Video = styled.video`
  width: 250px;
  height: 100%;
  border-radius: 15px;
`;

const Header = styled.div`
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;
  margin-bottom: 8px;
`;

const UserImage = styled.div`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  border: 1px solid #f00;
  img {
    width: 100%;
  }
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;

const Timer = styled.span`
  font-size: 10px;
  color: #9a9a9a;

  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

const Payload = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Icons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: start;
  align-items: center;
  margin-left: 50px;
  margin-top: 20px;
  cursor: pointer;
  color: #bababa;
  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

const Display = ({
  bio,
  createdAt,
  followers,
  photos,
  post,
  profileimg,
  userId,
  username,
  videos,
}) => {
  return (
    <Wrapper>
      <Header>
        <UserImage>
          {profileimg ? (
            <img src={profileimg} alt="User profile" />
          ) : (
            <UserIcon2 width={50} height={50} />
          )}
        </UserImage>
        <Username>{username}</Username>
        <Timer>{new Date(createdAt).toLocaleString()}</Timer>
      </Header>
      <Column>
        <Payload>{post}</Payload>
      </Column>
      {photos && photos.length > 0 && (
        <Column>
          {photos.map((photoUrl, index) => (
            <Photo key={index} src={photoUrl} alt={`Post Image ${index + 1}`} />
          ))}
        </Column>
      )}
      {videos && videos.length > 0 && (
        <Column>
          <Video src={videos[0]} autoPlay loop />
        </Column>
      )}
      <Icons>
        <HeartIcon width={24} /> 2
        <Coment width={24} />2
        <DmIcon width={20} />2
        <RetweetIcon width={24} />2
      </Icons>
    </Wrapper>
  );
};

export default Display;

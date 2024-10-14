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
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;

  padding: 20px;
  margin-bottom: 20px;
  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
  }
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 10px;
`;

const Photo = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover/contain;
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

const UserWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${(props) => props.theme.ImgBG};
  box-shadow: ${(props) => props.theme.ImgSH};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  path {
    fill: ${(props) => props.theme.searchColor};
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
  margin-top: 5px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
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
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const UserPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-left: 20px;
`;

const VideoWrapper = styled.div``;

const Displayitem = ({ display }) => {
  const { createdAt, photos, post, profileimg, username, videos } = display;

  return (
    <Wrapper>
      <Header>
        <UserWrapper>
          {profileimg ? (
            <img src={profileimg} alt="User profile" />
          ) : (
            <UserIcon2 width={50} />
          )}
        </UserWrapper>
        <UserPost>
          <Column>
            <Username>{username}</Username>
            <Timer>{new Date(createdAt).toLocaleString()}</Timer>
          </Column>
          <Payload>{post}</Payload>

          {photos && photos.length > 0 && (
            <>
              {photos.map((photoUrl, index) => (
                <Photo
                  key={index}
                  src={photoUrl}
                  alt={`Post Image ${index + 1}`}
                />
              ))}
            </>
          )}

          {videos && videos.length > 0 && (
            <VideoWrapper>
              <Video src={videos[0]} autoPlay loop />
            </VideoWrapper>
          )}
        </UserPost>
      </Header>
      <Icons>
        <HeartIcon width={24} /> 2
        <Coment width={24} /> 2
        <DmIcon width={20} /> 2
        <RetweetIcon width={24} /> 2
      </Icons>
    </Wrapper>
  );
};

export default Displayitem;

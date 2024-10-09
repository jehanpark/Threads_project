import styled from "styled-components";
import { UserIcon2 } from "../Common/Icon";

const NotificationContain = styled.div`
  width: 590px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 30px 20px;
  border-radius: 15px;
  background: ${(props) =>
    props.isRead ? props.theme.readBG : props.theme.activityBG};
  box-shadow: ${(props) => props.theme.activitySH};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) => props.theme.activityhover};
  }

  @media (max-width: 768px) {
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
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
    gap: 10px;
  }
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

const UserContex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 5px;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) =>
    props.isRead ? props.readTextColor : props.theme.followerfont};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const UserInfo = styled.p`
  font-size: 14px;
  color: ${(props) =>
    props.isRead ? props.readTextColor : props.theme.followerfont};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const UserDate = styled.p`
  font-size: 12px;
  color: ${(props) =>
    props.isRead ? props.readTextColor : props.theme.followerfont};

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const NotificationItem = ({
  profileImg,
  username,
  createdAt,
  onClick,
  isRead,
  message,
}) => {
  const getTimeDifference = (timestamp) => {
    if (!timestamp) return "날짜 없음";
    const now = new Date();
    const diffInMs = now - new Date(timestamp);
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}일 전`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))}주 전`;
    } else {
      return `${Math.floor(diffInHours / (24 * 30))}달 전`;
    }
  };

  const formattedDate = getTimeDifference(createdAt);
  const type = getTypeLabel(message);

  return (
    <NotificationContain onClick={onClick} isRead={isRead}>
      <Wrapper>
        <UserWrapper>
          {profileImg ? (
            <img src={profileImg} alt="User profile" />
          ) : (
            <UserIcon2 width={50} />
          )}
        </UserWrapper>
        <UserContex>
          <User>
            {type === "friend" && <UserInfo>친한친구</UserInfo>}
            <UserName>{username}</UserName>
          </User>
          <UserInfo>{message}</UserInfo>
          <UserDate>{formattedDate}</UserDate>
        </UserContex>
      </Wrapper>
    </NotificationContain>
  );
};

export default NotificationItem;

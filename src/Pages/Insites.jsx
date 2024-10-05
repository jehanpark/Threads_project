import React from "react";
import Insiteitem_de from "../Components/Login/Insiteitem_de";
import styled from "styled-components";
import Sidebar_de from "../Components/Sidebar_de";
import { BorderItem } from "../Components/Common/Border";

const BorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BorderItemTitle = styled.div`
  width: 590px;
  height: 25px;
  margin: 0 0 20px;
  color: #181818;
`;

const BorderItemInfo = styled.div`
  width: 590ox;
  height: 42px;
  color: #777;
`;

const Insites = () => {
  return (
    <div>
      <Sidebar_de />
      <Insiteitem_de />
      <BorderWrapper>
        <BorderItem type="insitesWrapper">
          <BorderItemTitle>조회수</BorderItemTitle>
          <BorderItemInfo>
            팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를
            조회했는지에 관한 정보를 더 확인할 수 있습니다.{" "}
          </BorderItemInfo>
        </BorderItem>
        <BorderItem type="insitesWrapper">
          <BorderItemTitle>반응</BorderItemTitle>
          <BorderItemInfo>
            팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠에
            반응했는지에 관한 정보를 더 확인할 수 있습니다.{" "}
          </BorderItemInfo>
        </BorderItem>
        <BorderItem type="insitesWrapper">
          <BorderItemTitle>팔로워</BorderItemTitle>
          <BorderItemInfo>
            팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를
            팔로우했는지에 관한 정보를 더 확인할 수 있습니다.{" "}
          </BorderItemInfo>
        </BorderItem>
      </BorderWrapper>
    </div>
  );
};

export default Insites;

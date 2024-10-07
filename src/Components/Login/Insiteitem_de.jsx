import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import BorderItem from "../Common/Border_de";
import { IconWrapper, InformationIcon, FollowerIcon } from "../Common/Icon";

// 스타일 정의
const BorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) => (props.isSmallScreen ? "100vw" : "600px")};
  height: auto;
  padding: ${(props) => (props.isSmallScreen ? "20px 0" : "0 ")};
`;

const InsitesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.isSmallScreen ? "column" : "")};
  gap: ${(props) => (props.isSmallScreen ? "0" : "20px")};
`;

const InsitesTitle = styled.div`
  margin-top: ${(props) => (props.isSmallScreen ? "4px" : "20px")};
  font-size: ${(props) => (props.isSmallScreen ? "16px" : "18px")};
  font-weight: 500;
`;

const BorderItemTitle = styled.div`
  width: ${(props) => (props.isSmallScreen ? "100%" : "480px")};
  height: ${(props) => (props.isSmallScreen ? "100%" : "25px")};
  font-size: ${(props) => (props.isSmallScreen ? "14px" : "18px")};
  padding: 0 20px;
  font-weight: bold;
  margin: 0 0 20px;
  color: #181818;
`;

const Info = styled.div`
  display: flex;
  gap: 20px;
`;

const BorderItemInfo = styled.div`
  height: 42px;
  color: #999;
  font-size: ${(props) => (props.isSmallScreen ? "12px" : "14px")};
  font-weight: 300;
`;

const FollowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isSmallScreen ? "100vw" : "600px")};
  height: ${(props) => (props.isSmallScreen ? "100%" : "100%")};
  padding: ${(props) => (props.isSmallScreen ? "20px 0" : "0 ")};
`;

const TotalInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowerInfo = styled.div`
  width: 436px;
  height: 317px;
  margin: 16px 0;
`;

const TotalNum = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-left: 8px;
`;

const TotalFollow = styled.div`
  color: #bababa;
  font-size: 1rem;
  margin: 12px 0;
`;

const Line = styled.hr`
  width: 96%;
  margin: 20px 0;
  border: none;
  height: 1px;
  background-color: #bababa;
`;

// 데이터
const items = [
  {
    title: "조회수",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
  {
    title: "반응",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
  {
    title: "팔로워",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
];

// 컴포넌트
const Insiteitem_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <BorderWrapper isSmallScreen={isSmallScreen}>
      <InsitesTitle isSmallScreen={isSmallScreen}>인사이트</InsitesTitle>
      {items.map((item) => (
        <BorderItem
          key={item.title}
          type="insitesWrapper"
          isSmallScreen={isSmallScreen}
        >
          <BorderItemTitle isSmallScreen={isSmallScreen}>
            {item.title}
          </BorderItemTitle>
          <Info>
            <IconWrapper
              background={"#e9e9e9"}
              borderRadius={"100%"}
              wrapperSize={"32px"}
              wrapperPadding={"8px"}
            >
              <InformationIcon width={"30px"} fill={"black"} zindex={"1"} />
            </IconWrapper>
            <BorderItemInfo isSmallScreen={isSmallScreen}>
              {item.info}
            </BorderItemInfo>
          </Info>
        </BorderItem>
      ))}
      <BorderItem type="followWrapper" isSmallScreen={isSmallScreen}>
        <BorderItemTitle isSmallScreen={isSmallScreen}>팔로워</BorderItemTitle>
        <Info>
          <FollowerWrapper>
            <FollowerInfo>
              <TotalInfo>
                <TotalNum>1</TotalNum>
                <TotalFollow>총 팔로워</TotalFollow>
              </TotalInfo>
              <FollowerIcon />
            </FollowerInfo>
          </FollowerWrapper>
        </Info>
        <Line />
        <Info>
          <IconWrapper
            background={"#e9e9e9"}
            borderRadius={"100%"}
            wrapperSize={"32px"}
            wrapperPadding={"8px"}
          >
            <InformationIcon width={"30px"} fill={"black"} zindex={"1"} />
          </IconWrapper>
          <BorderItemInfo isSmallScreen={isSmallScreen}>
            팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를
            조회했는지에 관한 정보를 더 확인할 수 있습니다.
          </BorderItemInfo>
        </Info>
      </BorderItem>
    </BorderWrapper>
  );
};

export default Insiteitem_de;

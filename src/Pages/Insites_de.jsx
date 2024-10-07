import React from "react";
import { useMediaQuery } from "react-responsive";
import Insiteitem_de from "../Components/Login/Insiteitem_de";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
// import PostForm from "../Components/PostForm";
import BorderItem from "../Components/Common/Border_de";

import {
  IconWrapper,
  InformationIcon,
  FollowerIcon,
} from "../Components/Common/Icon";

const BorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) =>
    props.isSmallScreen ? "100vw" : "600px"}; /* 부모 요소의 전체 너비 사용 */
  height: auto;
  padding: ${(props) =>
    props.isSmallScreen ? "20px 0" : "0 "}; /* 요소가 붙지 않도록 여백 추가 */
`;

const InsitesWrapper = styled.div`
  display: ${(props) => (props.isSmallScreen ? "flex" : "flex")};
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.isSmallScreen ? "column" : "")};
  gap: ${(props) => (props.isSmallScreen ? "0" : "20px")};
`;

const InsitesTitle = styled.div`
  margin-top: ${(props) => (props.isSmallScreen ? "4pxx" : "20px")};
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
  width: ${(props) =>
    props.isSmallScreen ? "100vw" : "600px"}; /* 부모 요소의 전체 너비 사용 */
  height: ${(props) => (props.isSmallScreen ? "100%" : "100%")};
  padding: ${(props) =>
    props.isSmallScreen ? "20px 0" : "0 "}; /* 요소가 붙지 않도록 여백 추가 */
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

const Insites_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div>
      <Sidebar />
      <Insiteitem_de />
      <InsitesWrapper isSmallScreen={isSmallScreen}>
        {/* <PostForm /> */}
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
        </BorderWrapper>
        <BorderWrapper isSmallScreen={isSmallScreen}>
          <InsitesTitle isSmallScreen={isSmallScreen}>인사이트</InsitesTitle>
          <BorderItem type="insitesWrapper" isSmallScreen={isSmallScreen}>
            <BorderItemTitle isSmallScreen={isSmallScreen}>
              조회수
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
                팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를
                조회했는지에 관한 정보를 더 확인할 수 있습니다.{" "}
              </BorderItemInfo>
            </Info>
          </BorderItem>
          <BorderItem type="insitesWrapper" isSmallScreen={isSmallScreen}>
            <BorderItemTitle isSmallScreen={isSmallScreen}>
              반응
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
                팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를
                조회했는지에 관한 정보를 더 확인할 수 있습니다.{" "}
              </BorderItemInfo>
            </Info>
          </BorderItem>
          <BorderItem type="followWrapper" isSmallScreen={isSmallScreen}>
            <BorderItemTitle isSmallScreen={isSmallScreen}>
              팔로워
            </BorderItemTitle>
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
                조회했는지에 관한 정보를 더 확인할 수 있습니다.{" "}
              </BorderItemInfo>
            </Info>
          </BorderItem>
        </BorderWrapper>
      </InsitesWrapper>
    </div>
  );
};

export default Insites_de;

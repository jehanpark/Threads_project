import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import BorderItem from "../Common/Border_de";
import { IconWrapper, InformationIcon, FollowerIcon } from "../Common/Icon";

// 스타일 정의
const BorderWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.isSmallScreen ? "column" : "row"}; /* 화면 크기에 따라 방향 설정 */
  align-items: flex-start;
  justify-content: center;
  width: ${(props) => (props.isSmallScreen ? "100vw" : "1200px")};
  height: auto;
  padding: ${(props) => (props.isSmallScreen ? "20x" : "0")};
  gap: ${(props) =>
    props.isSmallScreen ? "20px" : "40px"}; /* 모바일에서는 세로 간격 조정 */
  box-sizing: border-box; // 박스 크기를 조정하기 위해 box-sizing 사용
  /* overflow-x: hidden; // 넘침 방지 */
`;

const InsitesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) =>
    props.isSmallScreen ? "100%" : "auto"}; // 모바일에서는 100% 너비
  gap: ${(props) => (props.isSmallScreen ? "0" : "10px")};
  margin: 0; /* 박스 간 간격 제거 */
`;

const InsitesTitle = styled.div`
  margin-top: ${(props) => (props.isSmallScreen ? "4px" : "20px")};
  font-size: ${(props) => (props.isSmallScreen ? "16px" : "18px")};
  font-weight: 500;
`;

const BorderItemTitle = styled.div`
  width: ${(props) => (props.isSmallScreen ? "calc(100% - 40px)" : "480px")};
  height: ${(props) => (props.isSmallScreen ? "100%" : "25px")};
  font-size: ${(props) => (props.isSmallScreen ? "14px" : "18px")};
  padding: 0 20px;
  font-weight: bold;
  margin: 0 0 20px;
  color: #181818;
`;

const Info = styled.div`
  width: ${(props) => (props.isSmallScreen ? "100%" : "auto")};
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
  width: ${(props) => (props.isSmallScreen ? "100%" : "600px")};
  height: ${(props) => (props.isSmallScreen ? "100%" : "100%")};
  padding: ${(props) => (props.isSmallScreen ? "20px 0" : "0 ")};
  box-sizing: border-box; // 크기 조정
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

export const Line = styled.hr`
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

const itemsSecondBox = [
  {
    title: "조회수",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
  {
    title: "반응",
    info: "팔로워가 100명 이상이 되면 어떤 사람들이 회원님의 콘텐츠를 조회했는지에 관한 정보를 더 확인할 수 있습니다.",
  },
];

// 컴포넌트
const Insiteitem_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <BorderWrapper isSmallScreen={isSmallScreen}>
      {/* 1번째 인사이트 박스 */}
      <InsitesWrapper isSmallScreen={isSmallScreen}>
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
      </InsitesWrapper>
      {/* 2번째 인사이트 */}
      <InsitesWrapper isSmallScreen={isSmallScreen}>
        <InsitesTitle isSmallScreen={isSmallScreen}>인사이트</InsitesTitle>
        {itemsSecondBox.map((item) => (
          <BorderItem
            key={item.title}
            type="insitesWrapper"
            isSmallScreen={isSmallScreen}
          >
            <BorderItemTitle isSmallScreen={isSmallScreen}>
              {item.title}
            </BorderItemTitle>
            <Info isSmallScreen={isSmallScreen}>
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
          <BorderItemTitle isSmallScreen={isSmallScreen}>
            팔로워
          </BorderItemTitle>
          <Info isSmallScreen={isSmallScreen}>
            <FollowerWrapper isSmallScreen={isSmallScreen}>
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
      </InsitesWrapper>
    </BorderWrapper>
  );
};

export default Insiteitem_de;

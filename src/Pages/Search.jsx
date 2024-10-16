import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import Searchbar from "../Components/Search/Searchbar";
import FollowersList from "../Components/Search/FollowerList";
import TimeLine from "../Components/post/TimeLine";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  color: ${(props) => props.theme.fontcolor};
  transition: all 0.3s;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 auto; */
  /* padding: 20px; */
  height: 600px;
  border-radius: 40px 40px 0px 0px;
  background-color: ${(props) => props.theme.borderColor};
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 20px 20px 0px 0px;
  }
  @media (max-width: 480px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  padding-left: 100px;
  display: flex;
  width: 100%;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
`;

const SelectButton = styled(motion.button)`
  display: flex;
  flex: 0 0 auto;
  width: 110px;
  border-radius: 8px;
  padding: 10px 20px;
  background: ${(props) => props.theme.buttonbackground};
  border: 1px solid ${(props) => props.theme.searchButton};
  color: ${(props) => props.theme.buttonText};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;

  @media (max-width: 768px) {
    display: block;
    width: 90px;
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    display: block;
    width: 80px;
    padding: 6px 10px;
  }
`;

const ButtonGroupPC = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;

  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 480px) {
  }
`;

const SelectButtonPC = styled.button`
  flex: 0 0 auto;
  width: 106px;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
`;

const SearchBox = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
  }
`;

const ContentsBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 100%;
  max-height: 700px;
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-height: 100%;
  }
`;

const BoederWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  width: 680px;
  height: 85%;
  border-radius: 40px 40px 0px 0px;
  background-color: ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    /* height: calc(100% - 140px); */
    bottom: 0px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 40px;
`;

const Search = () => {
  const [showSearchBar, setShowSearchBar] = useState(true); // 검색창 표시 여부
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [contentType, setContentType] = useState("popular"); // 선택된 콘텐츠 타입 저장
  const [followersEmpty, setFollowersEmpty] = useState(false); // 팔로워가 비어 있는지 여부
  const [displaysEmpty, setDisplaysEmpty] = useState(false); // 게시글이 비어 있는지 여부
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 검색어 변경 시 처리
  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어를 상태로 저장
    setContentType("popular"); // 기본 필터로 설정
    setShowSearchBar(false);

    if (!term) {
      setFollowersEmpty(false);
      setDisplaysEmpty(false);

      return;
    }
  };

  // 버튼 클릭 시 필터링 처리
  const handleButtonClick = (type) => {
    setContentType(type);
  };

  // 미디어 사이즈 변화시 버튼 종류 변경
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // resize 이벤트를 감지하여 상태 업데이트
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 버튼 스타일 동적 처리
  const getButtonStyle = (type) => ({
    backgroundColor: contentType === type ? "#000" : "#fff",
    color: contentType === type ? "#fff" : "#000",
  });

  // 버튼 스타일 동적 적용
  const getPCButtonStyle = (type, isNightMode) => ({
    background: "transparent",
    color:
      contentType === type
        ? isNightMode
          ? "#FFF"
          : "#000"
        : isNightMode
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(204, 204, 204, 0.8)",
    borderBottom:
      contentType === type
        ? `1.5px solid ${isNightMode ? "#fff" : "#000"}`
        : "none",
  });

  const buttons = [
    { label: "인기", type: "popular" },
    { label: "최신", type: "recent" },
    { label: "사진", type: "picture" },
    { label: "동영상", type: "video" },
    { label: "프로필", type: "profile" },
  ];

  return (
    <BoederWrapper>
      <Contain>
        <MenuTitle>{searchTerm || "검색"}</MenuTitle>
        <Border>
          <SearchBox>
            {showSearchBar ? (
              <Searchbar addSearch={handleSearch} />
            ) : isMobile ? (
              <ButtonGroup
                className="mobile-buttons"
                whileTap="click"
                drag="x"
                dragMomentum={false}
                dragConstraints={{ left: -100, right: 0 }}
              >
                {buttons.map((button) => (
                  <SelectButton
                    key={button.type}
                    style={getButtonStyle(button.type)}
                    onClick={() => handleButtonClick(button.type)}
                  >
                    {button.label}
                  </SelectButton>
                ))}
              </ButtonGroup>
            ) : (
              <ButtonGroupPC className="desktop-buttons">
                {buttons.map((button) => (
                  <SelectButtonPC
                    key={button.type}
                    style={getPCButtonStyle(button.type)}
                    onClick={() => handleButtonClick(button.type)}
                  >
                    {button.label}
                  </SelectButtonPC>
                ))}
              </ButtonGroupPC>
            )}
          </SearchBox>
          <ContentsBorder>
            {contentType !== "picture" && contentType !== "video" && (
              <FollowersList
                searchTerm={searchTerm}
                contentType={contentType}
                onDataEmpty={(isEmpty) => setFollowersEmpty(isEmpty)}
              />
            )}

            {contentType !== "profile" && (
              <TimeLine
                searchTerm={searchTerm}
                contentType={contentType}
                onDataEmpty={(isEmpty) => setDisplaysEmpty(isEmpty)}
              />
            )}

            {contentType === "profile" && followersEmpty && (
              <NoResults>프로필이 존재하지 않습니다.</NoResults>
            )}

            {(contentType === "picture" || contentType === "video") &&
              displaysEmpty && (
                <NoResults>게시글이 존재하지 않습니다.</NoResults>
              )}

            {contentType !== "profile" &&
              contentType !== "picture" &&
              contentType !== "video" &&
              followersEmpty &&
              displaysEmpty && (
                <NoResults>게시글 및 프로필이 존재하지 않습니다.</NoResults>
              )}
          </ContentsBorder>
        </Border>
      </Contain>
    </BoederWrapper>
  );
};
export default Search;

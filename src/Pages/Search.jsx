import React, { useState } from "react";
import styled from "styled-components";
import Searchbar from "../Components/Search/Searchbar";
import SearchHistory from "../Components/Search/Searchhistory";
import Display from "../Components/Search/Display";
import FollowersList from "../Components/Search/FollowerList";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 39px;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 10px 10px 0 10px;
  width: 100%;
  max-width: 680px;
  height: 100vh;
  border: 1px solid #f00;
  border-radius: 40px 40px 0px 0px;
  background: #f5f5f5;

  @media (max-width: 768px) {
    width: 90%;
    border-radius: 20px 20px 0px 0px;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 10px 10px 0px 0px;
  }
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.fontcolor};
  transition: all 0.3s;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const SearchBox = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  button {
    width: 110px;
    border-radius: 8px;
    padding: 10px 20px;
    background: ${(props) => props.theme.buttonbackground};
    border: 1px solid ${(props) => props.theme.searchButton};
    color: ${(props) => props.theme.buttonText};
    font-weight: 700;
    cursor: pointer;
    transition: all;

    /* 반응형 적용 */
    @media (max-width: 768px) {
      width: 90px;
      padding: 8px 15px;
    }

    @media (max-width: 480px) {
      width: 80px;
      padding: 6px 10px;
    }
  }

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [contentType, setContentType] = useState("popular"); // 선택된 콘텐츠 타입 저장
  const [showSearchBar, setShowSearchBar] = useState(true); // 검색창 표시 여부
  const [history, setHistory] = useState([]); // 검색 기록 관리

  // 검색 수행 시
  const handleSearch = (term) => {
    setSearchTerm(term);
    setContentType("popular");
    setShowSearchBar(false); // 검색창 숨기기
    addSearchHistory(term); // 검색 기록 추가
  };

  // 검색 기록 추가
  const addSearchHistory = (term) => {
    setHistory([term, ...history]);
  };

  // 검색 기록 삭제
  const removeSearchHistory = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  // 버튼 클릭 시 콘텐츠 타입 설정
  const handleButtonClick = (type) => {
    setContentType(type);
  };

  const getButtonStyle = (type) => {
    return {
      backgroundColor: contentType === type ? "#000" : "#fff",
      color: contentType === type ? "#fff" : "#000",
    };
  };

  // 버튼 목록 배열
  const buttons = [
    { label: "인기", type: "popular" },
    { label: "최신", type: "recent" },
    { label: "사진", type: "picture" },
    { label: "동영상", type: "video" },
    { label: "프로필", type: "profile" },
  ];

  return (
    <div>
      <Contain>
        <MenuTitle>{searchTerm || "검색"}</MenuTitle>
        <Border>
          <SearchBox>
            {showSearchBar ? (
              <>
                <Searchbar addSearch={handleSearch} />
                <SearchHistory
                  history={history}
                  onRemove={removeSearchHistory}
                />
              </>
            ) : (
              <ButtonGroup>
                {buttons.map((button) => (
                  <button
                    key={button.type}
                    style={getButtonStyle(button.type)}
                    onClick={() => handleButtonClick(button.type)}
                  >
                    {button.label}
                  </button>
                ))}
              </ButtonGroup>
            )}
          </SearchBox>
          <FollowersList />
          <Display />
        </Border>
      </Contain>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Searchbar from "../Components/Search/Searchbar";
import FollowersList from "../Components/Search/FollowerList";
import DisplayList from "../Components/Search/DisplayList";
import TimeLine from "../Components/TimeLine";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 20px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-top: 40px;

  color: ${(props) => props.theme.fontcolor};
  transition: all 0.3s;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  max-width: 680px;
  height: 600px;
  border-radius: 40px 40px 0px 0px;
  background: ${(props) => props.theme.borderWrapper};

  @media (max-width: 768px) {
    width: 90%;
    border-radius: 20px 20px 0px 0px;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;

  button {
    flex: 0 0 auto;
    width: 110px;
    border-radius: 8px;
    padding: 10px 20px;
    background: ${(props) => props.theme.buttonbackground};
    border: 1px solid ${(props) => props.theme.searchButton};
    color: ${(props) => props.theme.buttonText};
    font-weight: 700;
    cursor: pointer;
    transition: all;

    @media (max-width: 768px) {
      width: 90px;
      padding: 8px 15px;
    }

    @media (max-width: 480px) {
      width: 80px;
      padding: 6px 10px;
    }
  }

  @media (max-width: 480px) {
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

const ContentsBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  padding-bottom: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  background: ${(props) => props.theme.borderWrapper};
  box-shadow: ${(props) => props.theme.bordershadow};
  @media (max-width: 768px) {
    position: fixed;
    border-radius: 0;
    width: 100%;
    height: calc(100% - 140px);
    bottom: 70px;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 20px;
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [contentType, setContentType] = useState("popular"); // 선택된 콘텐츠 타입 저장
  const [showSearchBar, setShowSearchBar] = useState(true); // 검색창 표시 여부
  const [followers, setFollowers] = useState([]); // 전체 팔로워 데이터
  const [displays, setDisplays] = useState([]); // 전체 게시글 데이터
  const [initialFilteredFollowers, setInitialFilteredFollowers] = useState([]); // 1차 필터된 팔로워 데이터
  const [initialFilteredDisplays, setInitialFilteredDisplays] = useState([]); // 1차 필터된 게시글 데이터
  const [filteredFollowers, setFilteredFollowers] = useState([]); // 2차 필터된 팔로워 데이터
  const [filteredDisplays, setFilteredDisplays] = useState([]); // 2차 필터된 게시글 데이터

  // Firestore에서 팔로워와 게시글 데이터 가져오기
  useEffect(() => {
    const unsubscribeFollowers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFollowers(data); // 팔로워 데이터 설정
        setFilteredFollowers(data); // 초기값 설정
      }
    );

    const unsubscribeDisplays = onSnapshot(
      collection(db, "contents"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDisplays(data); // 게시글 데이터 설정
        setFilteredDisplays(data); // 초기값 설정
      }
    );

    return () => {
      unsubscribeFollowers();
      unsubscribeDisplays();
    };
  }, []);

  // 검색어를 통한 1차 필터링
  const handleSearch = (term) => {
    setSearchTerm(term);
    setContentType("popular");
    setShowSearchBar(false);

    if (!term) {
      setInitialFilteredFollowers(followers);
      setInitialFilteredDisplays(displays);
      setFilteredFollowers(followers);
      setFilteredDisplays(displays);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();

    const filteredFollowers = followers.filter(
      (follower) =>
        follower.username.toLowerCase().includes(lowerCaseTerm) ||
        follower.bio.toLowerCase().includes(lowerCaseTerm)
    );

    const filteredDisplays = displays.filter(
      (display) =>
        display.post.toLowerCase().includes(lowerCaseTerm) ||
        display.username.toLowerCase().includes(lowerCaseTerm) ||
        display.userId.toLowerCase().includes(lowerCaseTerm)
    );

    // 1차 필터링된 데이터를 따로 저장
    setInitialFilteredFollowers(filteredFollowers);
    setInitialFilteredDisplays(filteredDisplays);

    // 1차 필터링된 데이터를 표시
    setFilteredFollowers(filteredFollowers);
    setFilteredDisplays(filteredDisplays);
  };

  // 버튼 클릭 시 2차 필터링 적용
  const handleButtonClick = (type) => {
    setContentType(type);

    //  1차 필터링된 데이터를 바탕으로 2차 필터링
    let filtered = [...initialFilteredDisplays];
    let filteredFollow = [...initialFilteredFollowers];

    if (type === "popular") {
      setFilteredDisplays(filtered);
      setFilteredFollowers(filteredFollow);
      return;
    }

    if (type === "recent") {
      filtered = filtered.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
      setFilteredDisplays(filtered);
      setFilteredFollowers(filteredFollow);
      return;
    }

    if (type === "picture") {
      filtered = filtered.filter((d) => d.photos && d.photos.length > 0);
      setFilteredDisplays(filtered);
      setFilteredFollowers([]);
    } else if (type === "video") {
      filtered = filtered.filter((d) => d.videos && d.videos.length > 0);
      setFilteredDisplays(filtered);
      setFilteredFollowers([]);
    } else if (type === "profile") {
      const profileFiltered = filteredFollow.filter(
        (follower) =>
          follower.username.includes(searchTerm) ||
          follower.bio.includes(searchTerm)
      );
      setFilteredDisplays([]);
      setFilteredFollowers(profileFiltered);
    }
  };
  // 동적으로 버튼 스타일 적용
  const getButtonStyle = (type) => {
    return {
      backgroundColor: contentType === type ? "#000" : "#fff",
      color: contentType === type ? "#fff" : "#000",
    };
  };

  const buttons = [
    { label: "인기", type: "popular" },
    { label: "최신", type: "recent" },
    { label: "사진", type: "picture" },
    { label: "동영상", type: "video" },
    { label: "프로필", type: "profile" },
  ];

  return (
    <div>
      <BoederWrapper>
        <Contain>
          <MenuTitle>{searchTerm || "검색"}</MenuTitle>
          <Border>
            <SearchBox>
              {showSearchBar ? (
                <Searchbar addSearch={handleSearch} />
              ) : (
                <ButtonGroup>
                  {buttons.map((button) => (
                    <button
                      key={button.type}
                      style={getButtonStyle(button.type)} // 선택된 버튼에 스타일 적용
                      onClick={() => handleButtonClick(button.type)}
                    >
                      {button.label}
                    </button>
                  ))}
                </ButtonGroup>
              )}
            </SearchBox>
            <ContentsBorder>
              {/* 검색어가 없을 때 모든 팔로워와 게시글을 보여줌 */}
              {searchTerm === "" && (
                <>
                  <FollowersList followers={followers} />
                  <DisplayList displays={displays} />
                </>
              )}
              {/* 필터링된 팔로워와 게시글을 보여줌 */}
              {filteredFollowers.length > 0 && (
                <FollowersList followers={filteredFollowers} />
              )}
              {filteredDisplays.length > 0 && (
                <DisplayList displays={filteredDisplays} />
              )}

              {/* 필터링 결과가 없을 때 */}
              {filteredDisplays.length === 0 &&
                filteredFollowers.length === 0 &&
                searchTerm !== "" && (
                  <NoResults>팔로워 또는 게시글이 없습니다.</NoResults>
                )}
            </ContentsBorder>
          </Border>
        </Contain>
      </BoederWrapper>
    </div>
  );
};

export default Search;

import { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Searchbar from "../Search/Searchbar";
import FollowersList from "../Search/FollowerList";
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const FollowModalBox = styled.div`
  width: 450px;
  height: 530px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderWrapper};
  padding: 64px 11px 0 11px;
  color: ${(props) => props.theme.fontcolor};
  position: relative;
  display: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "block")};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${(props) => props.theme.fontcolor};
  font-size: 18px;
  cursor: pointer;
`;

const NoResults = styled.p`
  font-size: 16px;
  text-align: center;
  color: #999;
  margin-top: 40px;
`;

// const FollowersList =

const FollowModal = ({ open, close, profile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  //검색어 상태
  const [followersEmpty, setFollowersEmpty] = useState(false); // 팔로워가 비어 있는지 여부
  const [contentType, setContentType] = useState("profile");
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  if (!open) return null;

  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어를 상태로 저장
    if (!term) {
      setFollowersEmpty(false);
    }
  };
  // 검색어를 업데이트하는 함수

  return (
    <>
      <ModalOverlay onClick={close}>
        <FollowModalBox
          isSmallScreen={isSmallScreen}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={close}>X</CloseButton>
          <Searchbar addSearch={handleSearch} />
          <FollowersList
            searchTerm={searchTerm}
            onDataEmpty={(isEmpty) => setFollowersEmpty(isEmpty)}
          />
          {contentType === "profile" && followersEmpty && (
            <NoResults>프로필이 존재하지 않습니다.</NoResults>
          )}
        </FollowModalBox>
      </ModalOverlay>
    </>
  );
};

export default FollowModal;

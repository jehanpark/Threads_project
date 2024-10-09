import React, { useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "../../styles/GlobalStyles.styles";
import { UserIcon1, MicIcon, SoundIcon } from "../Common/Icon";

const SearchWrapper = styled.div`
  width: 590px;
  max-width: 590px;
  min-width: 340px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: ${(props) => props.theme.searchBar};
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding-left: 10px;
  color: #1d1d1d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.searchColor};
    transition: all 0.3s;
  }

  &:focus::placeholder {
    color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MicButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  path {
    stroke: ${(props) => props.theme.searchColor};
  }
`;

const Searchbar = ({ addSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // 입력 값이 변경될 때마다 상태 업데이트
  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Enter 키를 눌렀을 때 실행되는 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      addSearch(searchQuery); // 검색어 전달
      setSearchQuery(""); // 검색창 초기화
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("음성 인식을 지원하지 않는 브라우저입니다.");
    return null;
  }

  // 음성 인식 시작/중지 관리
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      const processedTranscript = transcript.trim();
      if (processedTranscript !== "") {
        setSearchQuery(processedTranscript); // 음성 인식 텍스트 반영
        // 음성 인식 결과는 검색창에 표시되지만 바로 검색어 전달은 하지 않음
      }
      resetTranscript(); // 텍스트 리셋
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
    }
  };

  return (
    <SearchWrapper>
      <SearchBar
        type="text"
        value={searchQuery}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="검색"
      />
      <MicButton onClick={toggleListening}>
        {listening ? <SoundIcon width={20} /> : <MicIcon width={20} />}
      </MicButton>
    </SearchWrapper>
  );
};

export default Searchbar;

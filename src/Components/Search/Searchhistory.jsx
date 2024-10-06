import React from "react";
import styled from "styled-components";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "../../styles/GlobalStyles.styles";
import { CloseIcon } from "../Common/Icon";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const SearchBox = styled.div`
  margin-top: 10px;
  width: 590px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: ${(props) => props.theme.searchBar};
  color: ${(props) => props.theme.searchColor};
  transition: all 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-top: 5px;
  }
`;

const SearchHistoryItem = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border: none;
  transition: all 0.5s;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
  }
`;

const Search = styled.p`
  font-size: 13px;
  padding-left: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const SearchClose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;

  path {
    stroke: ${(props) => props.theme.searchColor};
  }

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const SearchHistory = ({ history, onRemove }) => {
  return (
    <Wrapper>
      {history.length > 0 && (
        <SearchBox>
          {history.map((query, index) => (
            <SearchHistoryItem key={index}>
              <Search>{query}</Search>
              <SearchClose onClick={() => onRemove(index)}>
                <CloseIcon width={8} />
              </SearchClose>
            </SearchHistoryItem>
          ))}
        </SearchBox>
      )}
    </Wrapper>
  );
};

export default SearchHistory;

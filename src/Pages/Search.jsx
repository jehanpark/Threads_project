import Border from "../Components/Common/Border";
import styled, { ThemeProvider } from "styled-components";
import Searchhistory from "../Components/Search/Searchhistory";
import FollowerItem from "../Components/Search/FollowerItem";
import FollowerList from "../Components/Search/FollowerList";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "../styles/GlobalStyles.styles";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 39px;
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 25px;
`;

const SearchContain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const FollowerRecommendation = styled.p`
  margin-top: 30px;
  margin-left: 38px;
  font-size: 15px;
  font-weight: 800;
`;

const Search = () => {
  return (
    <div>
      <Contain>
        <MenuTitle>검색</MenuTitle>
        <Border type="borderWrapper">
          <SearchContain>
            <Searchhistory />
          </SearchContain>
        </Border>
      </Contain>
    </div>
  );
};

export default Search;

import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import Constants from '../../constants';
import theme from '../../theme';

const SearchBarContainer = styled.View`
  background-color: ${theme.colors.antiFlashWhite};
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const SearchInput = styled.TextInput`
  width: 60%;
  font-size: 16px;
`;

interface SearchBarProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder, onChangeText}) => {
  return (
    <SearchBarContainer>
      <SearchIcon source={Constants.Images.searchIcon} resizeMode="contain" />
      <SearchInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.dark}
        onChangeText={onChangeText}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;

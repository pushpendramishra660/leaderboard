import React from 'react';
import {FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';
import {User} from '../../types/index';
import theme from '../../theme';

interface TableProps {
  data: User[];
  selectedUser?: User | null;
}

const StyledTableContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.grey};
`;

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.grey};
  width: 100%;
`;

const StyledCell = styled.Text<{isHighlighted?: boolean}>`
  flex: 1;
  text-align: center;
  ${props =>
    props.isHighlighted &&
    css`
      color: ${theme.colors.venetianRed};
    `}
`;

const Table: React.FC<TableProps> = ({data, selectedUser}) => {
  const renderItem = ({item}: {item: User}) => {
    return (
      <StyledRow testID="table-row">
        <StyledCell isHighlighted={item.name === selectedUser?.name}>
          {item.name}
        </StyledCell>
        <StyledCell>{item.rank}</StyledCell>
        <StyledCell>{item.bananas}</StyledCell>
        <StyledCell>{item.subscribed ? 'Yes' : 'No'}</StyledCell>
      </StyledRow>
    );
  };

  return (
    <StyledTableContainer>
      <StyledHeader>
        <StyledCell>Name</StyledCell>
        <StyledCell>Rank</StyledCell>
        <StyledCell>Number of Bananas</StyledCell>
        <StyledCell>Is Searched User</StyledCell>
      </StyledHeader>
      <FlatList
        data={data}
        keyExtractor={item => item.uid}
        renderItem={renderItem}
      />
    </StyledTableContainer>
  );
};

export default Table;

import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { SearchBar, Table, CustomButton } from "~/components";
import { User } from "~/types";
import users from '../../assets/files/leaderboard.json';
import Constants from '~/constants';

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
`;

const StyledSearchBarContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UserListScreen: React.FC = () => {
  const [searchedUser, setSearchedUser] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const initialData: User[] = Object.values(users);
  const [topUsers, setTopUsers] = useState<User[]>([]);

  const handleSearch = () => {
    if (searchedUser.length === 0) return;
    const sortedUsers = [...initialData].sort((a, b) => b.bananas - a.bananas);
    const foundUser = sortedUsers.find((user) => user.name === searchedUser);

    if (!foundUser) {
      Alert.alert(Constants.Messages.alertTitle, Constants.Messages.noUserFound);
      return;
    }

    const top10Users = sortedUsers.slice(0, 10);
    const foundTopUser = top10Users.find((user) => user.name === searchedUser);

    const filteredUsers = top10Users.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    const userIndex = sortedUsers.findIndex(
      (user) => user.name === searchedUser
    );
    if (userIndex !== -1 && !foundTopUser) {
      filteredUsers[filteredUsers.length - 1] = {
        ...sortedUsers[userIndex],
        rank: userIndex + 1,
      };
      setUserData(sortedUsers[userIndex]);
    } else {
      setUserData(foundTopUser || foundUser);
    }

    setTopUsers(filteredUsers);
  };

  return (
    <StyledContainer>
      <StyledSearchBarContainer>
        <SearchBar placeholder="User Name..." onChangeText={setSearchedUser} />
        <CustomButton label="Search" onPress={handleSearch} />
      </StyledSearchBarContainer>
      <Table data={topUsers} selectedUser={userData} />
    </StyledContainer>
  );
};

export default UserListScreen;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { SearchBar, Table, CustomButton } from "../../components";
import { User } from "~/types";
import users from "../../assets/files/leaderboard.json";
import Constants from "../../constants";

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
  const initialData: User[] = useMemo(() => Object.values(users), []);

  // Memoized values for initial data and sorted users

  const sortedUsers = useMemo(() => {
    return [...initialData]
      .sort((a, b) => b.bananas - a.bananas)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  }, [initialData]);

  // Render Initial Top 10 users

  useEffect(() => {
    setTopUsers(sortedUsers.slice(0, 10));
  }, [sortedUsers]);

  // Callback function to handle user search

  const handleSearch = useCallback(() => {
    // Return if search is empty
    if (!searchedUser) {
      return;
    }
    // Search for the user in the sorted users list
    const foundUser = sortedUsers.find(
      (user) => user.name.toLowerCase() === searchedUser.toLowerCase()
    );
    if (!foundUser) {
      // Show an alert if the user is not found
      Alert.alert(
        Constants.Messages.alertTitle,
        Constants.Messages.noUserFound
      );
      return;
    }

    const top10Users = sortedUsers.slice(0, 10);
    const userIndex = top10Users.findIndex(
      (user) => user.name.toLowerCase() === searchedUser.toLowerCase()
    );
    if (userIndex !== -1) {
      // Update top users if the user is already in the top 10
      setTopUsers(top10Users);
    } else {
      // Update top users if the user is not in the top 10
      const updatedTopUsers = [...top10Users];
      updatedTopUsers[updatedTopUsers.length - 1] = foundUser;
      setTopUsers(updatedTopUsers);
    }
    setUserData(userIndex !== -1 ? sortedUsers[userIndex] : foundUser);
  }, [searchedUser, sortedUsers]);

  const [topUsers, setTopUsers] = useState<User[]>([]);

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

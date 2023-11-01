import React from 'react';
import renderer from 'react-test-renderer';
import {Alert} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import UserListScreen from '../index';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('<UserListScreen />', () => {
  test('renders UserListScreen component', () => {
    const {getByText, getByPlaceholderText} = render(<UserListScreen />);
    const searchBarPlaceholder = getByPlaceholderText('User Name...');
    const searchButton = getByText('Search');
    expect(searchBarPlaceholder).toBeTruthy();
    expect(searchButton).toBeTruthy();
  });

  test('searching for a user displays user data', async () => {
    const {getByPlaceholderText, getByText} = render(<UserListScreen />);
    const searchBar = getByPlaceholderText('User Name...');
    const searchButton = getByText('Search');

    fireEvent.changeText(searchBar, 'Chris Buckley');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(getByText('Chris Buckley')).toBeTruthy();
      expect(getByText('6200')).toBeTruthy();
    });
  });

  test('searching for a non-existing user shows error alert', () => {
    const {getByPlaceholderText, getByText} = render(<UserListScreen />);
    const searchBar = getByPlaceholderText('User Name...');
    const searchButton = getByText('Search');

    fireEvent.changeText(searchBar, 'NonExistingUser');
    fireEvent.press(searchButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'User not found. Please enter a valid username.',
    );
  });

  it('UserListScreen matches snapshot', () => {
    const component = renderer.create(<UserListScreen />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

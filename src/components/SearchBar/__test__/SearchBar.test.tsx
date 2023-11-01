import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import SearchBar from '../index';

describe('<SearchBar />', () => {
  it('renders SearchBar correctly', () => {
    const {getByPlaceholderText} = render(
      <SearchBar placeholder="Search..." onChangeText={() => {}} />,
    );
    const inputElement = getByPlaceholderText('Search...');
    expect(inputElement).toBeTruthy();
  });
  it('calls the provided onChangeText function when input value changes', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar placeholder="Search..." onChangeText={onChangeTextMock} />,
    );
    const inputElement = getByPlaceholderText('Search...');
    fireEvent.changeText(inputElement, 'Test');
    expect(onChangeTextMock).toHaveBeenCalledWith('Test');
  });

  it('SearchBar component matches snapshot', () => {
    const onChangeTextMock = jest.fn();
    const component = renderer.create(
      <SearchBar placeholder="Search..." onChangeText={onChangeTextMock} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

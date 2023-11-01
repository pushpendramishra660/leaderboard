import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from '../index';

describe('<CustomButton />', () => {
  it('renders button correctly', () => {
    const {getByText} = render(
      <CustomButton label="Test Button" onPress={() => {}} />,
    );
    const buttonElement = getByText('Test Button');
    expect(buttonElement).toBeTruthy();
  });
  it('calls the provided function when button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton label="Test Button" onPress={onPressMock} />,
    );
    const buttonElement = getByText('Test Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });
  it('displays correct button label', () => {
    const {getByText} = render(
      <CustomButton label="Submit" onPress={() => {}} />,
    );
    const buttonElement = getByText('Submit');
    expect(buttonElement).toBeTruthy();
  });
  it('CustomButton component matches snapshot', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(
      <CustomButton label="Test Button" onPress={onPressMock} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

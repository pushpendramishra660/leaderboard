import React from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';

const StyledButtonContainer = styled.TouchableOpacity`
  background-color: ${theme.colors.blue};
  padding: 10px 20px;
  border-radius: 5px;
`;

const StyledButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  text-align: center;
`;

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({label, onPress}) => {
  return (
    <StyledButtonContainer onPress={onPress}>
      <StyledButtonText>{label}</StyledButtonText>
    </StyledButtonContainer>
  );
};

export default CustomButton;

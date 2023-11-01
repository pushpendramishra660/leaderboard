/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC} from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from './src/theme';
import {UserListScreen} from './src/screens';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserListScreen />
    </ThemeProvider>
  );
};

export default App;

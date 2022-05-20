import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';

import { Colors } from './styles';

import RootNavigator from './navigations';
import AuthProvider from './context/AuthProvider';

import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar StatusBarStyle='light-content' backgroundColor={Colors.BLACK} />
        <RootNavigator />
      </SafeAreaView>
      <Toast />
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

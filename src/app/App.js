import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { store, persistor } from './store';
import AppNavigator from '../navigation/AppNavigator';
import { colors } from '../utils';

/**
 * Main App component
 * Sets up Redux store, persistence, and navigation
 */
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.primary}
        />
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

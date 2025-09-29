import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../utils';

// Import screens
import TodoListScreen from '../features/todos/screens/TodoListScreen';
import TodoDetailScreen from '../features/todos/screens/TodoDetailScreen';
import AddTodoScreen from '../features/todos/screens/AddTodoScreen';

const Stack = createStackNavigator();

/**
 * AppNavigator - Main navigation component
 * Handles all screen navigation using React Navigation
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TodoList"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{
            title: 'My Todos',
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
        
        <Stack.Screen
          name="TodoDetail"
          component={TodoDetailScreen}
          options={({ route }) => ({
            title: route.params?.todo?.name || 'Todo Details',
            headerStyle: {
              backgroundColor: colors.primary,
            },
          })}
        />
        
        <Stack.Screen
          name="AddTodo"
          component={AddTodoScreen}
          options={{
            title: 'Add Todo',
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

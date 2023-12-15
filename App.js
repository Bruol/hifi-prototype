import React, { useState } from "react";
import { StatusBar, TouchableOpacity } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Text, IconRegistry, Icon, useTheme } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import Dashboard from "./views/Dashboard";
import HabitCreation from './views/HabitCreation';
import HabitEditing from './views/HabitEditing';

// TODO: Currently only used for consistency testing, remove later... :)
const isDarkMode = false;

const Stack = createStackNavigator();

const CancelIcon = () => {
  // Get theme
  const theme = useTheme();

  // Get navigation
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 10 }}
      onPress={() => navigation.goBack()}
    >
      <Icon name='arrow-back-outline' fill={theme["text-info-color"]} style={{ width: 24, height: 24 }} />
      <Text style={{ marginLeft: 5, color: theme["text-info-color"] }}>Cancel</Text>
    </TouchableOpacity>
  );
}

const Navigator = () => {

  // State for habit creation and editing
  const [focusedHabitId, setFocusedHabitId] = useState(null);
  const navigation = useNavigation();
  const onOpenEditHabit = (habitId) => {
    setFocusedHabitId(habitId);
    navigation.navigate("Edit Habit");
  }
  const onOpenCreateHabit = () => {
    setFocusedHabitId(null);
    navigation.navigate("Create Habit");
  }

  // Get theme
  const theme = useTheme();
  const screenOptions = {
    headerStyle: {
      backgroundColor: theme["background-basic-color-1"],
      borderBottomWidth: 1,
      borderBottomColor: theme["border-basic-color-4"],
    },
    cardStyle: { backgroundColor: theme["background-basic-color-2"] }
  };

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="Dashboard"
        children={(props) =>
          <Dashboard {...props}
            setFocusedHabitId={setFocusedHabitId}
            onOpenEditHabit={onOpenEditHabit}
            onOpenCreateHabit={onOpenCreateHabit}
          />}
      />
      <Stack.Screen
        name="Create Habit"
        children={(props) => <HabitCreation {...props} />}
        options={{
          headerLeft: () => (<CancelIcon />)
        }}
      />
      <Stack.Screen
        name="Edit Habit"
        children={(props) => <HabitEditing{...props} focusedHabitId={focusedHabitId} />}
        options={{
          headerLeft: () => (<CancelIcon />)
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * This is the main component of the app. It contains the navigation, the header, the footer and the confetti cannon component.
 * @returns {JSX.Element}
 */
const App = () => {
  // Set dark mode for status bar
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

  return (
    <>
      {/* Necessary for icons to work */}
      <IconRegistry icons={EvaIconsPack} />

      {/* Main component */}
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <NavigationContainer initialRouteName="Dashboard" theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <Navigator />
        </NavigationContainer>
      </ApplicationProvider >
    </>
  );
};

export default App;

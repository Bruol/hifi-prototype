import React, { useRef, useState } from "react";
import { Alert, StatusBar, TouchableOpacity } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Text, IconRegistry, Icon, useTheme, View } from '@ui-kitten/components';

import ViewSun from "./views/ViewSun";
import HabitCreation from './views/HabitCreation';
import HabitEditing from './views/HabitEditing';

// TODO: Currently only used for consistency testing, remove later... :)
const isDarkMode = false;

const Stack = createStackNavigator();

// Date selection icon
const CalendarIcon = ({ setStep }) => {
  // Get theme
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: 10 }}
      onPress={() => setStep(0)}
    >
      <Text style={{ marginRight: 5, color: theme["text-info-color"] }}>Today</Text>
      <Icon name='calendar-outline' fill={theme["text-info-color"]} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
}

const BackIcon = () => {
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
      <Text style={{ marginLeft: 5, color: theme["text-info-color"] }}>Back</Text>
    </TouchableOpacity>
  );
}

const Navigator = ({ step, setStep }) => {

  // State for habit creation and editing
  const [focusedHabitId, setFocusedHabitId] = useState(null);
  const [onReturn, setOnReturn] = useState(null);
  const navigation = useNavigation();
  const onOpenEditHabit = (habitId) => {
    setFocusedHabitId(habitId);
    navigation.navigate("Habit Editing");
  }
  const onOpenCreateHabit = () => {
    setFocusedHabitId(null);
    navigation.navigate("Habit Creation");
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
        name="Dashboard Sun"
        children={(props) =>
          <ViewSun {...props}
            step={step}
            setStep={setStep}
            setFocusedHabitId={setFocusedHabitId}
            onOpenEditHabit={onOpenEditHabit}
            onOpenCreateHabit={onOpenCreateHabit}
            // setOnReturn={setOnReturn} // TODO: Currently not used
          />}
        options={{
          headerRight: () => (<CalendarIcon setStep={setStep} />),
        }}
      />
      <Stack.Screen
        name="Habit Creation"
        children={(props) => <HabitCreation {...props} />}
        options={{
          headerLeft: () => (<BackIcon />)
        }}
      />
      <Stack.Screen
        name="Habit Editing"
        children={(props) => <HabitEditing{...props} focusedHabitId={focusedHabitId} onReturn={onReturn} />}
        options={{
          headerLeft: () => (<BackIcon />)
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
  const [step, setStep] = useState(0);

  return (
    <>
      {/* Necessary for icons to work */}
      <IconRegistry icons={EvaIconsPack} />

      {/* Main component */}
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <NavigationContainer initialRouteName="Dashboard Sun" theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <Navigator step={step} setStep={setStep} />
        </NavigationContainer>
      </ApplicationProvider >
    </>
  );
};

export default App;

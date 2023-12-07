// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useRef, useState } from "react";
import { Alert, StatusBar, TouchableOpacity } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Text, IconRegistry, Icon, useTheme, View } from '@ui-kitten/components';
import ConfettiCannon from 'react-native-confetti-cannon';

import ViewSun from "./views/ViewSun";
import ViewMoon from "./views/ViewMoon";
import ViewSelection from "./views/ViewSelection";
import Footer from './components/Footer';

// TODO: Currently only used for consistency testing, maybe remove later... :)
const isDarkMode = false; 

const Stack = createStackNavigator();

// Date selection icon
const CalendarIcon = () => {
  // Get theme
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: 10 }}
      onPress={() => Alert.alert("Not Implemented", 'Date selection is not part of the prototype!')}
    >
      <Text style={{ marginRight: 5, color: theme["text-info-color"] }}>Today</Text>
      <Icon name='calendar-outline' fill={theme["text-info-color"]} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
}

// Back navigation icon

const BackIcon = () => {
  const navigation = useNavigation();
  const [pressCount, setPressCount] = useState(0);

  // Get theme
  const theme = useTheme();

  // Handle back button press and ask for confirmation
  const handleBackPress = () => {
    setPressCount(pressCount + 1);

    // Reset press count after 2 seconds
    if (pressCount === 0) {
      setTimeout(() => setPressCount(0), 2000);
    }

    if (pressCount >= 4) {
      Alert.alert(
        'Are you sure…',
        '…that you want to go back?\n\nAll progress will be lost.',
        [
          {
            text: 'Cancel',
            onPress: () => setPressCount(0),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Dashboard Selection');
              setPressCount(0);
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <TouchableOpacity
      style={{ opacity: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
      onPress={handleBackPress}
    >
      <Icon name='arrow-back-outline' fill={theme["text-info-color"]} style={{ width: 24, height: 24 }} />
      <Text style={{ marginLeft: 5, color: theme["text-info-color"] }}>Back</Text>
    </TouchableOpacity>
  );
}

const Navigator = ({ confettiRef }) => {
  const theme = useTheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme["background-basic-color-1"],
      borderBottomWidth: 1,
      borderBottomColor: theme["border-basic-color-4"],
    },
    cardStyle: { backgroundColor: theme["background-basic-color-2"] }
  };

  console.log(confettiRef);

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="Dashboard Selection"
        component={ViewSelection}
      />
      <Stack.Screen
        name="Dashboard Sun"
        children={(props) => <ViewSun {...props} confettiRef={confettiRef} />}
        options={{
          headerLeft: () => (<BackIcon />),
          headerRight: () => (<CalendarIcon />),
        }}
      />
      <Stack.Screen
        name="Dashboard Moon"
        children={(props) => <ViewMoon {...props} confettiRef={confettiRef} />}
        options={{
          headerLeft: () => (<BackIcon />),
          headerRight: () => (<CalendarIcon />),
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
  // Reference to confetti cannon component
  const confettiRef = useRef();


  /* Set dark mode for status bar */
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

  return (
    <>
      {/* Necessary for icons */}
      <IconRegistry icons={EvaIconsPack} />


      {/* Main component */}
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <NavigationContainer initialRouteName="Dashboard A" theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <Navigator confettiRef={confettiRef} />
        </NavigationContainer>
        {/* Confetti cannon */}
        <ConfettiCannon
          count={200}
          origin={{ x: 207, y: -20 }}
          colors={confettiColors}
          autoStart={false}
          fadeOut={true}
          ref={confettiRef}
        />
        {/* Footer */}
        <Footer />
      </ApplicationProvider >
    </>
  );
};

// Colors for confetti cannon
const confettiColors = ["#3366FF", "#4CAF50", "#FFC107", "#FF5722", "#9C27B0"];

export default App;


// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useRef } from "react";
import { Alert, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Text, IconRegistry, Icon } from '@ui-kitten/components';
import ConfettiCannon from 'react-native-confetti-cannon';

import ViewSun from "./views/ViewSun";
import ViewMoon from "./views/ViewMoon";
import ViewSelection from "./views/ViewSelection";
import Footer from './components/Footer';

const Stack = createStackNavigator();

// Date selection icon
const CalendarIcon = () => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: 10 }}
    onPress={() => Alert.alert("Not Implemented", 'Date selection is not part of the prototype!')}
  >
    <Text style={{ marginRight: 5, color: "#3366FF" }}>Today</Text>
    <Icon name='calendar-outline' fill='#3366FF' style={{ width: 24, height: 24 }} />
  </TouchableOpacity>
);

// Back navigation icon
const BackIcon = () => {
  const navigation = useNavigation();

  // Handle back button press and ask for confirmation
  const handleBackPress = () => {
    Alert.alert(
      'Are you sure…',
      '…that you want to go back?\n\nAll progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dashboard Selection'),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
      onPress={handleBackPress}
    >
      <Icon name='arrow-back-outline' fill='#3366FF' style={{ width: 24, height: 24 }} />
      <Text style={{ marginLeft: 5, color: "#3366FF" }}>Back</Text>
    </TouchableOpacity>
  );
}

/**
 * This is the main component of the app. It contains the navigation, the header, the footer and the confetti cannon component.
 * @returns {JSX.Element}
 */
const App = () => {
  // Reference to confetti cannon component
  const confettiRef = useRef();

  return (
    <>
      {/* Necessary for icons */}
      <IconRegistry icons={EvaIconsPack} />

      {/* Set dark mode for status bar */}
      <StatusBar barStyle="dark-content" />

      {/* Main component */}
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer initialRouteName="Dashboard A">
          <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: "#F7F9FC" }
            }}
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
        </NavigationContainer>

        {/* Footer */}
        <Footer />

        {/* Confetti cannon */}
        <ConfettiCannon
          count={200}
          origin={{ x: 207, y: -20 }}
          colors={confettiColors}
          autoStart={false}
          fadeOut={true}
          ref={confettiRef}
        />
      </ApplicationProvider >
    </>
  );
};

// Colors for confetti cannon
const confettiColors = ["#3366FF", "#4CAF50", "#FFC107", "#FF5722", "#9C27B0"];

export default App;


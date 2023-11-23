// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, Icon } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

/**
 * This component is the first screen that the user sees. It allows the user to select which dashboard to view.
 * @returns {JSX.Element}
 */
const ViewSelection = () => {
  // Get navigation object
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      {/* Heading */}
      <Text style={styles.space_bottom} category='h4'>
        Development Dashboard
      </Text>

      <Text style={styles.space_bottom_small} category='p1'>
        If you are a user, congratulations! 🎉
      </Text>
      <Text style={styles.space_bottom_small} category='p1'>
        You have found a way to access the secret development dashboard.
      </Text>
      <Text category='p1'>
        Here, have a cookie: 🍪
      </Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Text explaining how the views of both prototypes can be accessed and left */}
      <Text category='h6' style={styles.space_bottom_small}>
        Short Instructions
      </Text>
      <Text style={styles.space_bottom_small} category='p1'>
        1. To access a prototype, press the corresponding button below.
      </Text>
      <Text category='p1'>
        2. To leave a prototype, <Text status="primary" category='p1' style={{ fontWeight: "bold" }}>press the invisible button in the top left corner five times in a row</Text>.
      </Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Subheading for the two prototypes */}
      <Text style={styles.space_bottom_small} category='h6'>
        Prototypes
      </Text>

      {/* Texts explaining the purpose of this screen */}
      <Text style={styles.space_bottom_small} category='p1'>
        Here you can access the two prototypes.
      </Text>

      {/* Buttons to access the two prototypes */}
      <View>
        <Button
          style={styles.space_bottom_small} onPress={() => navigation.navigate('Dashboard Sun')}
          accessoryRight={<Icon name='sun-outline' style={{ width: 24, height: 24 }} />}
        >
          <Text>Dashboard</Text>
        </Button>
        <Button
          onPress={() => navigation.navigate('Dashboard Moon')}
          accessoryRight={<Icon name='moon-outline' style={{ width: 24, height: 24 }} />}
        >
          <Text>Dashboard</Text>
        </Button>
      </View>
    </View >
  );
}

// Component styling
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E4E9F2",
    marginVertical: 20
  },
  space_bottom: {
    marginBottom: 20
  },
  space_bottom_small: {
    marginBottom: 10
  }
});

export default ViewSelection;

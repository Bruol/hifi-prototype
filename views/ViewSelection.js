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
      <Text style={styles.space_bottom} category='h1'>
        Development Dashboard
      </Text>
      <Button
        style={styles.space_bottom} onPress={() => navigation.navigate('Dashboard Sun')}
        accessoryRight={<Icon name='sun-outline' fill='#FFF' style={{ width: 24, height: 24 }} />}
      >
        <Text>Dashboard</Text>
      </Button>
      <Button
        onPress={() => navigation.navigate('Dashboard Moon')}
        accessoryRight={<Icon name='moon-outline' fill='#FFF' style={{ width: 24, height: 24 }} />}
      >
        <Text>Dashboard</Text>
      </Button>
    </View >
  );
}

// Component styling
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  space_bottom: {
    marginBottom: 20
  }
});

export default ViewSelection;

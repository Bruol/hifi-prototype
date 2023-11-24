// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from 'react';
import { Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

/**
 * This component renders the footer of the dashboards.
 * @returns {JSX.Element}
 */
const Footer = () => {
  return (
    <View style={styles.wrapper}>

      {/* Button to view the statistics */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => Alert.alert("Not Implemented", "Viewing statistics is not part of the prototype!")}>
        <Icon style={styles.icon} name="bar-chart-outline" fill="#8F9BB3" />
        <Text appearance="hint" category="s2">Statistics</Text>
      </TouchableOpacity>

      {/* Button to add a new habit */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => Alert.alert("Not Implemented", "Adding a new habit is not part of the prototype!")}>
        <View style={styles.centralButton}>
          <Icon style={styles.icon} name="plus-outline" fill="#FFF" />
        </View>
        <Text style={{marginTop: 5}} status="primary" category="s1">New Habit</Text>
      </TouchableOpacity>

      {/* Button to view the settings */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => Alert.alert("Not Implemented", "Viewing settings is not part of the prototype!")}>
        
        <Icon style={styles.icon} name="settings-outline" fill="#8F9BB3" />
        <Text appearance="hint" category="s2">Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component styling
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 80,
    borderTopWidth: 1,
    borderTopColor: "#E4E9F2",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  centralButton: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -60,
    // left: 177,
    borderRadius: 30,
    backgroundColor: "#3366FF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default Footer;

// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from 'react';
import { Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';

/**
 * This component renders the footer of the dashboards.
 * @returns {JSX.Element}
 */
const Footer = () => {
  // Get theme colors
  const theme = useTheme();
  const iconColorDark = theme['text-hint-color'];
  const iconColorLight = theme['text-control-color'];

  // Get themed styles
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.wrapper}>

      {/* Button to view the statistics */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => Alert.alert("Not Implemented", "Viewing statistics is not part of the prototype!")}>
        <Icon style={styles.icon} name="bar-chart-outline" fill={iconColorDark} />
        <Text appearance="hint" category="s2">Statistics</Text>
      </TouchableOpacity>

      {/* Button to add a new habit */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => Alert.alert("Not Implemented", "Adding a new habit is not part of the prototype!")}>
        <View style={styles.centralButton}>
          <Icon style={styles.icon} name="plus-outline" fill={iconColorLight} />
        </View>
        <Text style={{marginTop: 5}} status="primary" category="s1">New Habit</Text>
      </TouchableOpacity>

      {/* Button to view the settings */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => Alert.alert("Not Implemented", "Viewing settings is not part of the prototype!")}>
        
        <Icon style={styles.icon} name="settings-outline" fill={iconColorDark} />
        <Text appearance="hint" category="s2">Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// Component styling
const themedStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 80,
    backgroundColor: "background-basic-color-1",
    borderTopWidth: 1,
    borderTopColor: "border-basic-color-4",
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
    borderRadius: 30,
    backgroundColor: "color-primary-500",
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

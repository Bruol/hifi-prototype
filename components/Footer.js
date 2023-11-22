// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from 'react';
import { Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';

/**
 * This component renders the footer of the dashboards.
 * @returns {JSX.Element}
 */
const Footer = () => {
  return (
    <View style={styles.wrapper}>
      {/* Button to add a new habit */}
      <TouchableOpacity onPress={() => Alert.alert("Not Implemented", "Adding a new habit is not part of the prototype!")}>
        <View style={styles.button}>
          <Icon style={styles.icon} name="plus-outline" fill="#FFF" />
        </View>
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
    borderTopColor: "#E4E9F2"
  },
  button: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -30,
    left: 177,
    borderRadius: 30,
    backgroundColor: "#3366FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default Footer;

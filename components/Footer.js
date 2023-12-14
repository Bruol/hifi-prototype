import React from 'react';
import { Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

/**
 * This component renders the footer of the dashboards.
 * @returns {JSX.Element}
 */
const Footer = ({onOpenCreateHabit}) => {
  // Get theme colors
  const theme = useTheme();
  const iconColorDark = theme['background-basic-color-1'];
  const iconColorLight = theme['text-control-color'];

  const navigation = useNavigation();

  // Get themed styles
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.wrapper}>
      {/* Button to add a new habit */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={onOpenCreateHabit}>
        <View style={styles.centralButton}>
          <Icon style={styles.icon} name="plus-outline" fill={iconColorLight} />
        </View>
        <Text style={{ marginTop: 5 }} status="primary" category="s1">New Habit</Text>
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

// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card, Icon, Text, Button } from "@ui-kitten/components";
import PropTypes from 'prop-types';

import ProgressBar from "./ProgressBar";

/**
 * This component is used for the next pending habit in dashboard B.
 * @param {Object} habit - The habit to display
 * @param {Function} onConfirm - The function to execute when the habit is confirmed
 * @returns {JSX.Element}
 */
const BigHabitCard = ({ habit, onConfirm }) => (
    <Card key={habit.id} style={styles.card} status="warning">
      <View style={styles.wrapper}>

        <View style={styles.titleRow}>
          {/* Habit title */}
          <Text category="h5">{habit.title}</Text>
          {/* Icon */}
          <Icon name={habit.icon} style={styles.icon} />
        </View>


        {/* Progress bar */}
        <ProgressBar range={[0, habit.goal]} value={habit.streak} width={300} />

        {/* Confirmation Button */}
        <Button style={{ marginTop: 10 }} status="success" accessoryLeft={<Icon name='checkmark-circle' />} onPress={onConfirm}>Confirm</Button>

        {/* Divider */}
        <View style={{ width: "100%", height: 1, backgroundColor: "#E4E9F2", marginVertical: 10 }} />

        {/* Settings Button */}
        <Button appearance="ghost" accessoryLeft={<Icon name='settings-outline' />} onPress={() => Alert.alert("Not Implemented", "Settings are not part of the prototype.")}>Settings</Button>
      </View>
    </Card >
  );

// Property typed of MainCard
BigHabitCard.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    streak: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

// Component styling
const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressWrapper: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center'
  },
  statsWrapper: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "flex-end",
    marginBottom: 2
  },
  progressBar: {
    width: 50,
    height: 8,
    backgroundColor: "#E4E9F2",
    borderRadius: 4,
    overflow: "hidden"
  },
  progress: {
    height: 8,
    backgroundColor: "#CDDC39",
    borderRadius: 4
  },
  icon: {
    width: 30,
    height: 30
  },
});

export default BigHabitCard;

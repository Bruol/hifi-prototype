// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Icon, Text } from "@ui-kitten/components";
import PropTypes from 'prop-types';

/**
 * This component is used for the next pending habit in dashboard B.
 * @param {Object} habit - The habit to display
 * @param {Function} onPress - The function to execute when the card is pressed
 * @returns {JSX.Element}
 */
const MainCard = ({ habit, onPress }) => {
  // Calculate progress
  const progress = (habit.streak / habit.goal);

  // Calculate color of progress bar
  let color;
  if (progress < 0.33) {
    color = '#FFC107'; // Yellow
  } else if (progress < 0.66) {
    color = '#CDDC39'; // Lime
  } else {
    color = '#4CAF50'; // Green
  }

  return (
    <Card key={habit.id} style={styles.card} status="warning" onPress={() => onPress()}>
      <View style={styles.wrapper}>

        {/* Icon */}
        <Icon name={habit.icon} fill="#8F9BB3" style={styles.icon} />

        {/* Habit title */}
        <Text category="h6">{habit.title}</Text>

        {/* Progress */}
        <View style={styles.progressWrapper}>
          {/* Streak and goal value */}
          <View style={styles.statsWrapper}>
            <Text category="h5">{habit.streak}</Text>
            <Text category="p1" style={{ color: "#8F9BB3" }}>/{habit.goal}</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBar}>
            <View style={{ ...styles.progress, width: 50 * progress, backgroundColor: color }} />
          </View>
        </View>
      </View>
    </Card>
  );
}

// Property typed of MainCard
MainCard.propTypes = {
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
    height: 100,
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
    height: "100%",
    backgroundColor: "#CDDC39",
    borderRadius: "50%"
  },
  icon: {
    width: 25,
    height: 25
  },
});

export default MainCard;

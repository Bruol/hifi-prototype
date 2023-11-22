// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Icon, Text } from "@ui-kitten/components";
import PropTypes from 'prop-types';

/**
 * This component is used for the list of habits in dashboard A.
 * @param {Object} habit - The habit to display
 * @param {String} status - The status of the card
 * @param {Function} onPress - The function to execute when the card is pressed
 * @returns {JSX.Element}
 */
const ListCard = ({ habit, status, onPress }) => {
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
    <Card key={habit.id} style={styles.card} status={status} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Icon */}
        <Icon name={habit.icon} fill="#8F9BB3" style={styles.icon} />

        {/* Habit title */}
        <Text category="h6">{habit.title}</Text>

        {/* Progress */}
        <View style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
          {/* Streak and goal value */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2 }}>
            <Text category="h5">{habit.streak}</Text>
            <Text category="p1" style={{ color: "#8F9BB3" }}>/{habit.goal}</Text>
          </View>

          {/* Progress bar */}
          <View style={{ width: 50, height: 8, backgroundColor: "#E4E9F2", borderRadius: 4, overflow: "hidden" }}>
            <View style={{ width: 50 * progress, height: 8, backgroundColor: color, borderRadius: 4 }} />
          </View>
        </View>

      </View>
    </Card>
  );
}

// Property typed of ListCard
ListCard.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    streak: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

// Component styling
const styles = StyleSheet.create(
  {
    card: {
      width: "100%",
      marginVertical: 6
    },
    icon: {
      width: 25,
      height: 25
    },
  }
)

export default ListCard;

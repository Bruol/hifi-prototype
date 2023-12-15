import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Icon, Text, useTheme } from "@ui-kitten/components";
import PropTypes from 'prop-types';

import ProgressBar from "./ProgressBar";

/**
 * This component is used for the list of habits in dashboard A.
 * @param {Object} habit - The habit to display
 * @param {String} status - The status of the card
 * @param {Function} onPress - The function to execute when the card is pressed
 * @returns {JSX.Element}
 */
const ListHabitCard = ({ habit, status, onPress }) => {
  // Get theme colors
  const theme = useTheme();
  const iconColor = theme['text-hint-color'];

  // TODO: Remove debug logs
  // console.log("ListHabitCard:");
  // console.log("> habit: {");
  // console.log(">   title: " + habit.title);
  // console.log(">   iconName: " + habit.iconName);
  // console.log(">   repetitions: " + habit.repetitions);
  // console.log(">   completions: " + habit.completions);
  // console.log("> }");
  // console.log("> status: " + status);
  // console.log("> onPress: " + onPress);

  return (
    <Card key={habit.id} style={styles.card} status={status} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Icon */}
        <Icon name={habit.iconName} fill={iconColor} style={styles.icon} />

        {/* Habit title */}
        <Text category="h6">{habit.title}</Text>

        {/* Progress */}
        <ProgressBar
          range={[0, habit.repetitions]}
          value={habit.completions}
          isShowingNumbers={true}
        />

      </View>
    </Card>
  );
}

// Property typed of ListCard
ListHabitCard.propTypes = {
  habit: PropTypes.object.isRequired,
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

export default ListHabitCard;

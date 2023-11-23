// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Alert, Animated } from "react-native";
import { Card, Icon, Text, Button } from "@ui-kitten/components";
import PropTypes from 'prop-types';

import ProgressBar from "./ProgressBar";

/**
 * This component is used for the next pending habit in dashboard B.
 * @param {Object} habit - The habit to display
 * @param {Function} onConfirm - The function to execute when the habit is confirmed
 * @returns {JSX.Element}
 */
const BigHabitCard = ({ habit, onConfirm }) => {

  // Spring animation for the card
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [habit]);

  return (
    <Animated.View style={{transform: [{scale: scaleValue}]}}>
      <Card key={habit.id} style={styles.card} status="warning">
        <View style={styles.wrapper}>

          {/* Title Row */}
          <View style={styles.titleRow}>
            <Text category="h5">{habit.title}</Text>
            <Icon name={habit.icon} style={styles.icon} />
          </View>

          {/* Progress bar */}
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <ProgressBar range={[0, habit.goal]} value={habit.streak} width={304} />
          </View>

          {/* Confirmation Button */}
          <Button status="success" accessoryLeft={<Icon name='checkmark-circle' />} onPress={onConfirm}>Check Habit</Button>
          
          {/* Divider */}
          <View style={{ width: "100%", height: 1, backgroundColor: "#E4E9F2", marginVertical: 10 }} />
          
          {/* Settings Button */}
          <Button size="small" appearance="ghost" status="info" accessoryLeft={<Icon name='settings-outline' />} onPress={() => Alert.alert("Not Implemented", "Editing habits is not part of the prototype.")}>Edit Habit</Button>
        </View>
      </Card >
    </Animated.View>
  );
};

// Property typed of MainCard
BigHabitCard.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    streak: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
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
  icon: {
    width: 30,
    height: 30
  },
});

export default BigHabitCard;

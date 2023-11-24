// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useState, useCallback } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import { pendingData, completedData } from '../HabitData';
import BigHabitCard from '../components/BigHabitCard';
import UncheckModal from '../components/UncheckModal';
import SmallHabitCard from '../components/SmallHabitCard';


// Vertical scroll component for pending & completed habits
const VerticalScroll = ({ habits, status, onPress }) => (
  <View style={{ overflow: 'hidden' }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* Add more one small card component per pending habit */}
      {habits.map((habit) => (
        <SmallHabitCard key={habit.id} habit={habit} status={status} onPress={() => onPress(habit.id)} />
      ))}
    </ScrollView>
    <LinearGradient
      colors={["#F7F9FC00", "#F7F9FCFF"]}
      start={{ x: 0.98, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      pointerEvents='none'
    />
    <LinearGradient
      colors={["#F7F9FC00", "#F7F9FCFF"]}
      start={{ x: 0.02, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      pointerEvents='none'
    />
  </View>
);

// Property types for vertical scroll component
VerticalScroll.propTypes = {
  habits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    streak: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

/**
 * This is the main component for dashboard B.
 * @param {object} confettiRef Reference to confetti cannon component
 * @returns {object} JSX for this component
 */
const ViewMoon = ({ confettiRef }) => {
  // State containing list of pending habits except the next one
  const [pendingHabits, setPendingHabits] = useState(pendingData.slice(1));
  // State containing next pending habit
  const [focusedHabit, setFocusedHabit] = useState(pendingData[0]);
  // State containing active habit
  const [activeHabit, setActiveHabit] = useState(focusedHabit);
  // State containing list of completed habits 
  const [completedHabits, setCompletedHabits] = useState(completedData);

  // State for modal visibility 
  const [isUncheckModalVisible, setUncheckModalVisible] = useState(false);
  // State for pending action 
  const [pendingAction, setPendingAction] = useState(null);

  const checkHabit = useCallback((id) => {
    // Find the habit to focus
    let newFocusedHabit = pendingHabits.find((habit) => habit.id === id);

    // 1. Remove the pressed habit from the pending list
    // 2. Add the previous focused habit to the pending list
    // 3. Sort the list
    setPendingHabits((prevPendingHabits) => {
      const newPendingHabits = prevPendingHabits.filter((habit) => habit.id !== id);
      newPendingHabits.push(focusedHabit);
      newPendingHabits.sort((a, b) => a.id - b.id);
      return newPendingHabits;
    });

    // Set new next focused habit
    setFocusedHabit(newFocusedHabit);
  });

  const checkFocusedHabit = useCallback(() => {
    // Add the focused habit to the completed list 
    setCompletedHabits([{ ...focusedHabit, streak: focusedHabit.streak + 1 }, ...completedHabits]);

    // Get first pending habit
    const habit = pendingHabits[0];

    // Set new next pending habit
    setFocusedHabit(habit);

    // Remove the habit from the pending list 
    setPendingHabits(pendingHabits.slice(1));

    // Start confetti if last habit
    if (pendingHabits.length === 0) {
      confettiRef.current.start();
    }
  });

  const uncheckHabit = useCallback((id) => {
    // Find the habit 
    const habit = completedHabits.find((habit) => habit.id === id);

    // Set the active habit
    setActiveHabit(habit);

    // Set the pending action
    setPendingAction(() => () => {
      // Remove the habit from the completed list 
      setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));

      if (focusedHabit) {
        // Add the habit to the pending list 
        setPendingHabits([{ ...habit, streak: habit.streak - 1 }, ...pendingHabits]);
      } else {
        // Set the habit as the next focused habit
        setFocusedHabit({ ...habit, streak: habit.streak - 1 });
      }
    });

    // Show confirmation modal
    setUncheckModalVisible(true);
  });

  const handleClose = () => {
    // Handle the cancellation of unchecking habits here
    setPendingAction(null);
    setUncheckModalVisible(false);
  };

  const handleUncheck = () => {
    // Handle the confirmation of unchecking habits here
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setUncheckModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>

      {/* Header for pending habits */}
      <View style={styles.cardView}>
        <Text category="h4">Pending Habits</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text category="c1">Tap to focus</Text>
        </View>
      </View>

      {/* Horizontal scroll for pending habits */}
      <VerticalScroll
        habits={pendingHabits}
        status="warning"
        onPress={(id) => checkHabit(id)}
      />

      {/* Card for either focused habit or completion message */}
      {focusedHabit ? (
        <BigHabitCard habit={focusedHabit} status='warning' onConfirm={() => checkFocusedHabit()} />
      ) : (
        <Card style={{ marginTop: 10 }}>
          <View style={styles.finishedContent}>
            <Text style={{ textAlign: "center" }} category='h3'>You have completed all habits for today!</Text>
            <Text category='h1'>🎉</Text>
          </View>
        </Card>
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Subheader for completed habits */}
      <View style={styles.cardView}>
        <Text category="h4">Completed Habits</Text>

        {/* Text to explain checking */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text category="c1">Tap to view</Text>
        </View>
      </View>

      {/* Horizontal scroll for completed habits */}
      <VerticalScroll
        habits={completedHabits}
        status="success"
        onPress={(id) => uncheckHabit(id)}
      />

      {/* Modal for confirming checking/unchecking habits */}
      <UncheckModal
        habit={activeHabit}
        isVisible={isUncheckModalVisible}
        handleUncheck={handleUncheck}
        handleClose={handleClose}
      />
    </View>
  );
};

// Property types for main component
ViewMoon.propTypes = {
  confettiRef: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "stretch",
    padding: 20
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E4E9F2",
    marginVertical: 20
  },
  finishedContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
});

export default ViewMoon;

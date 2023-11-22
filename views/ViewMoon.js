// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useState, useCallback } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import { pendingData, completedData } from '../HabitData';
import BigHabitCard from '../components/BigHabitCard';
import ConfirmationModal from '../components/ConfirmationModal';
import SmallHabitCard from '../components/SmallHabitCard';


// Vertical scroll component for pending & completed habits
const VerticalScroll = ({ habits, status, onPress }) => (
  <View style={{ overflow: 'hidden' }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* Add more one small card component per pending habit */}
      {habits.map((habit) => (
        <SmallHabitCard key={habit.id} habit={habit} status={status} onPress={() => { console.log("vertical scroll: " + habit.id); onPress(habit.id); }} />
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
  const [nextPendingHabit, setNextPendingHabit] = useState(pendingData[0]);
  // State containing list of completed habits 
  const [completedHabits, setCompletedHabits] = useState(completedData);
  // State for modal visibility 
  const [isModalVisible, setModalVisible] = useState(false);
  // State for pending action 
  const [pendingAction, setPendingAction] = useState(null);
  // State for confirmation text
  const [confirmText, setConfirmText] = useState("");

  const completeHabit = useCallback((id) => {
    // Find the habit 
    let habit = pendingHabits.find((habit) => habit.id === id);

    // Set the pending action
    setPendingAction(() => () => {
      // Remove the habit from the pending list 
      setPendingHabits(pendingHabits.filter((habit) => habit.id !== id));

      // Add the habit to the completed list 
      setCompletedHabits([{ ...habit, streak: habit.streak + 1 }, ...completedHabits]);
    });

    // Show confirmation modal
    setConfirmText('Do you want to check the habit "' + habit.title + '"?');
    toggleModal();
  });

  const completeNextPendingHabit = useCallback(() => {
    // Add the habit to the completed list 
    setCompletedHabits([{ ...nextPendingHabit, streak: nextPendingHabit.streak + 1 }, ...completedHabits]);

    // Get first pending habit
    const habit = pendingHabits[0];

    // Set new next pending habit
    setNextPendingHabit(habit);

    // Remove the habit from the pending list 
    setPendingHabits(pendingHabits.slice(1));

    // Start confetti if last habit
    if (pendingHabits.length === 0) {
      confettiRef.current.start();
    }
  });

  // Function to uncomplete a habit 
  const uncompleteHabit = useCallback((id) => {
    // Find the habit 
    const habit = completedHabits.find((habit) => habit.id === id);

    // Set the pending action
    setPendingAction(() => () => {
      // Remove the habit from the completed list 
      setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));

      if (nextPendingHabit) {
        // Add the habit to the pending list 
        setPendingHabits([{ ...habit, streak: habit.streak - 1 }, ...pendingHabits]);
      } else {
        setNextPendingHabit({ ...habit, streak: habit.streak - 1 });
      }
    });

    // Show confirmation modal
    setConfirmText('Do you want to uncheck the habit "' + habit.title + '"?');
    toggleModal();
  });

  // Modal for checking/unchecking habits
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    // Handle the cancellation of checking/unchecking habits here
    setPendingAction(null);
    toggleModal();
  };

  // Confirm button for checking/unchecking habits 
  const handleConfirm = () => {
    // Handle the confirmation of checking/unchecking habits here
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    toggleModal();
  };

  return (
    <View style={{ flexDirection: "column", justifyContent: "space-between", alignContent: "stretch" }}>
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        {/* Subheader for pending habits */}
        <View style={styles.cardView}>
          <Text category="h4">Pending Habits</Text>

          {/* Text to explain checking */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text category="c1">Tap to check</Text>
          </View>
        </View>

        {/* Horizontal scroll for pending habits */}
        <VerticalScroll habits={pendingHabits} status="warning" onPress={(id) => completeHabit(id)} />

        {/* Card for next pending habit or completion message */}
        {nextPendingHabit ? (
          <BigHabitCard habit={nextPendingHabit} status='warning' onConfirm={() => completeNextPendingHabit()} />
        ) : (
          <Card style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
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
            <Text category="c1">Tap to uncheck</Text>
          </View>
        </View>

        {/* Horizontal scroll for completed habits */}
        <VerticalScroll habits={completedHabits} status="success" onPress={(id) => uncompleteHabit(id)} />
      </View>

      {/* Modal for confirming checking/unchecking habits */}
      <ConfirmationModal isVisible={isModalVisible} confirmText={confirmText} handleConfirm={handleConfirm} handleCancel={handleCancel} />
    </View>
  );
};

// Property types for main component
ViewMoon.propTypes = {
  confettiRef: PropTypes.object.isRequired,
};

const styles = StyleSheet.create(
  {
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
  }
);

export default ViewMoon;

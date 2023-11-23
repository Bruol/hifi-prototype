// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import { pendingData, completedData } from '../HabitData';
import ListHabitCard from '../components/ListHabitCard';
import UncheckModal from '../components/UncheckModal';
import CheckModal from '../components/CheckModal';

/**
 * This component renders the view for prototype A.
 * @param {object} confettiRef - Reference to confetti cannon component
 * @returns {JSX.Element}
 */
const ViewSun = ({ confettiRef }) => {
    // State containing list of pending habits 
    const [pendingHabits, setPendingHabits] = useState(pendingData);
    // State containing list of completed habits 
    const [completedHabits, setCompletedHabits] = useState(completedData);

    // State for pending action 
    const [pendingAction, setPendingAction] = useState(null);
    // State for focus habit
    const [focusHabit, setFocusHabit] = useState(pendingData[0]);

    // State for check modal visibility
    const [isCheckModalVisible, setCheckModalVisible] = useState(false);
    // Async function to complete a habit 
    const checkHabit = useCallback((id) => {
        // Find the habit
        const habit = pendingHabits.find((habit) => habit.id === id);
        // Set focus to the habit
        setFocusHabit(habit);

        // Set the pending action
        setPendingAction(() => () => {
            // Remove the habit from the pending list 
            setPendingHabits(pendingHabits.filter((habit) => habit.id !== id));

            // Add the habit to the completed list and sort by id
            setCompletedHabits((completedHabits) => [...completedHabits, { ...habit, streak: habit.streak + 1 }].sort((a, b) => a.id - b.id));

            // Start confetti if last habit
            if (pendingHabits.length === 1) {
                confettiRef.current.start();
            }
        });

        // Show check modal
        setCheckModalVisible(true);
    });
    // Confirm button for checking habits 
    const handleCheck = () => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
        setCheckModalVisible(false);
    };

    // State for uncheck modal visibility 
    const [isUncheckModalVisible, setUncheckModalVisible] = useState(false);
    // Function to uncomplete a habit 
    const uncheckHabit = useCallback((id) => {
        // Find the habit 
        const habit = completedHabits.find((habit) => habit.id === id);
        // Set focus to the habit
        setFocusHabit(habit);

        // Set the pending action
        setPendingAction(() => () => {
            // Remove the habit from the completed list 
            setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));

            // Add the habit to the pending list and sort by id
            setPendingHabits((pendingHabits) => [...pendingHabits, { ...habit, streak: habit.streak - 1 }].sort((a, b) => a.id - b.id));
        });

        // Show uncheck modal
        setUncheckModalVisible(true);
    });
    // Confirm button for unchecking habits 
    const handleUncheck = () => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
        setUncheckModalVisible(false);
    };

    const handleClose = () => {
        // Handle the cancellation of checking/unchecking habits here
        setPendingAction(null);
        setCheckModalVisible(false);
        setUncheckModalVisible(false);
    };

    return (
        <View style={styles.wrapper}>
            {/* Page content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'spread', paddingHorizontal: 20, paddingTop: 20 }}>

                {/* Subheader for pending habits */}
                <View style={styles.cardView}>
                    <Text category="h5">Pending Habits</Text>

                    {/* Text to explain checking */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text category="c1">Tap to view</Text>
                    </View>
                </View>

                {(pendingHabits && pendingHabits.length > 0) ? (
                    // List of pending habits
                    pendingHabits.map(
                        (habit) =>
                            <ListHabitCard
                                key={habit.id}
                                habit={habit}
                                status="warning"
                                onPress={() => checkHabit(habit.id)}
                            />
                    )
                ) : (
                    <Card style={styles.finishedCard}>
                        <View style={styles.finishedContent}>
                            <Text style={{ textAlign: "center" }} category='h3'>You have completed all habits for today!</Text>
                            <Text category='h1'>🎉</Text>
                        </View>
                    </Card>
                )}

                {/* Divider */}
                <View style={styles.divider} />

                {/* Subheader for complete habits */}
                <View style={styles.cardView}>
                    <Text category="h5">Completed Habits</Text>

                    {/* Text to explain unchecking */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text category="c1">Tap to view</Text>
                    </View>
                </View>

                {/* List of completed habits */}
                {completedHabits.map(
                    (habit) =>
                        <ListHabitCard
                            key={habit.id}
                            habit={habit}
                            status="success"
                            onPress={() => uncheckHabit(habit.id)}
                        />
                )}

                {/* Modal for confirming checking habits */}
                <CheckModal
                    isVisible={isCheckModalVisible}
                    habit={focusHabit}
                    handleCheck={handleCheck}
                    handleClose={handleClose}
                />
                {/* Modal for confirming unchecking habits */}
                <UncheckModal
                    isVisible={isUncheckModalVisible}
                    habit={focusHabit}
                    handleUncheck={handleUncheck}
                    handleClose={handleClose}
                />
            </ScrollView>
        </View>
    );
};

// Property types for this component
ViewSun.propTypes = {
    confettiRef: PropTypes.object.isRequired
};

// Component styling
const horizontalFlex = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'stretch',
        justifyContent: 'center',
        marginVertical: 2
    },
    finishedCard: {
        marginTop: 10,
        alignSelf: "stretch"
    },
    finishedContent: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    cardView: {
        ...horizontalFlex,
        width: "100%",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#E4E9F2",
        marginVertical: 20
    },
    header: {
        ...horizontalFlex,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#F7F9FC",
        borderBottomColor: "#E4E9F2",
        borderBottomWidth: 1
    },
    dateSelector: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F7F9FC"
    },
    footer: {
        ...horizontalFlex,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "#F7F9FC",
        borderTopColor: "#E4E9F2",
        borderTopWidth: 1
    }
});

export default ViewSun;

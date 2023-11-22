// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import { pendingData, completedData } from '../HabitData';
import ListHabitCard from '../components/ListHabitCard';
import ConfirmationModal from '../components/ConfirmationModal';

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
    // State for modal visibility 
    const [isModalVisible, setModalVisible] = useState(false);
    // State for pending action 
    const [pendingAction, setPendingAction] = useState(null);
    // State for confirmation text
    const [confirmText, setConfirmText] = useState("");

    // Async function to complete a habit 
    const completeHabit = useCallback((id) => {
        // Find the habit
        const habit = pendingHabits.find((habit) => habit.id === id);

        // Set the pending action
        setPendingAction(() => () => {
            // Remove the habit from the pending list 
            setPendingHabits(pendingHabits.filter((habit) => habit.id !== id));

            // Add the habit to the completed list 
            setCompletedHabits([{ ...habit, streak: habit.streak + 1 }, ...completedHabits]);

            // Start confetti if last habit
            if (pendingHabits.length === 1) {
                confettiRef.current.start();
            }
        });

        // Show confirmation modal
        setConfirmText('Do you want to check the habit "' + habit.title + '"?');
        toggleModal();
    });

    // Function to uncomplete a habit 
    const uncompleteHabit = useCallback((id) => {
        // Find the habit 
        const habit = completedHabits.find((habit) => habit.id === id);

        // Set the pending action
        setPendingAction(() => () => {
            // Remove the habit from the completed list 
            setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));

            // Add the habit to the pending list 
            setPendingHabits([{ ...habit, streak: habit.streak - 1 }, ...pendingHabits]);
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
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', marginVertical: 2 }}>
            {/* Page content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'spread', paddingHorizontal: 20, paddingTop: 20 }}>

                {/* Subheader for pending habits */}
                <View style={styles.cardView}>
                    <Text category="h5">Pending Habits</Text>

                    {/* Text to explain checking */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text category="c1">Tap to check</Text>
                    </View>
                </View>

                {(pendingHabits && pendingHabits.length > 0) ? (
                    // List of pending habits
                    pendingHabits.map((habit) => <ListHabitCard key={habit.id} habit={habit} status="warning" onPress={() => completeHabit(habit.id)} />)
                ) : (
                    <Card style={{ marginTop: 10, alignSelf: "stretch" }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
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
                        <Text category="c1">Tap to uncheck</Text>
                    </View>
                </View>

                {/* List of completed habits */}
                {completedHabits.map((habit) => <ListHabitCard key={habit.id} habit={habit} status="success" onPress={() => uncompleteHabit(habit.id)} />)}

                {/* Modal for confirming checking/unchecking habits */}
                <ConfirmationModal
                    isVisible={isModalVisible}
                    confirmText={confirmText}
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel}
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

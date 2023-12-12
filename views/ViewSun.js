import React, { useState, useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useStyleSheet } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import ConfettiCannon from 'react-native-confetti-cannon';

import { DataHandler } from '../data/DataHandler';
import ListHabitCard from '../components/ListHabitCard';
import UncheckModal from '../modals/UncheckModal';
import CheckModal from '../modals/CheckModal';
import Footer from '../components/Footer';

/**
 * This component renders the view for prototype A.
 * @param {object} confettiRef - Reference to confetti cannon component
 * @returns {JSX.Element}
 */
const ViewSun = () => {
    // Reference to confetti cannon component
    const confettiRef = useRef();

    const dataHandler = new DataHandler();
    const [pendingHabitIds, setPendingHabitIds] = useState(dataHandler.getPendingDataIds());
    const [completedHabitIds, setCompletedHabitIds] = useState(dataHandler.getCompletedDataIds());
    const updateHabitIds = () => {
        setPendingHabitIds(dataHandler.getPendingDataIds());
        setCompletedHabitIds(dataHandler.getCompletedDataIds());
    }
    dataHandler.addOnAddHabitListener(updateHabitIds);
    dataHandler.addOnRemoveHabitListener(updateHabitIds);

    // State for pending action 
    const [pendingAction, setPendingAction] = useState(null);
    // State for focus habit
    const [focusHabitId, setFocusHabitId] = useState(1);

    // State for check modal visibility
    const [isCheckModalVisible, setCheckModalVisible] = useState(false);
    // Async function to complete a habit 
    const checkHabit = useCallback((id) => {
        // Set states for confirmation modal
        setFocusHabitId(id);
        setPendingAction(() => () => {
            dataHandler.setHabitCompleted(id);
            if (dataHandler.getPendingDataIds().length === 0) {
                confettiRef.current.start();
            }
        });

        // Show confirmation modal
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
        // Set focus to the habit
        setFocusHabitId(id);

        // Set the pending action
        setPendingAction(() => () => {
            // Set the habit to pending
            dataHandler.setHabitCompleted(id, false);
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

    // Get themed styles
    const styles = useStyleSheet(themedStyles);

    return (
        <View>

            <View style={styles.contentWrapper}>
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
                    {(pendingHabitIds.length > 0) ? (
                        // List of pending habits
                        pendingHabitIds.map(
                            (habitId) => <ListHabitCard
                                key={habitId}
                                habit={dataHandler.getHabitById(habitId)}
                                status="warning"
                                onPress={() => checkHabit(habitId)}
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
                    {(completedHabitIds.length > 0) ? (
                        completedHabitIds.map(
                            (habitId) =>
                                <ListHabitCard
                                    key={habitId}
                                    habit={dataHandler.getHabitById(habitId)}
                                    status="success"
                                    onPress={() => uncheckHabit(habitId)}
                                />
                        )
                    ) : (
                        <Card style={styles.finishedCard}>
                            <View style={styles.finishedContent}>
                                <Text style={{ textAlign: "center" }} category='h3'>You have not completed any habits yet!</Text>
                                <Text category='h1'>🥹</Text>
                            </View>
                        </Card>
                    )}
                    {/* Modal for confirming checking habits */}
                    <CheckModal
                        isVisible={isCheckModalVisible}
                        habitId={focusHabitId}
                        handleCheck={handleCheck}
                        handleClose={handleClose}
                    />
                    {/* Modal for confirming unchecking habits */}
                    <UncheckModal
                        isVisible={isUncheckModalVisible}
                        habitId={focusHabitId}
                        handleUncheck={handleUncheck}
                        handleClose={handleClose}
                    />
                </ScrollView>
            </View>

            {/* Confetti cannon */}
            <ConfettiCannon
                count={200}
                origin={{ x: 207, y: -20 }}
                colors={confettiColors}
                autoStart={false}
                fadeOut={true}
                ref={confettiRef}
            />

            {/* Footer */}
            <View style={styles.footerWrapper}>
                <Footer />
            </View>
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
const themedStyles = StyleSheet.create({
    contentWrapper: {
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingBottom: 80,
    },
    footerWrapper: {
        width: "100%",
        position: 'absolute',
        bottom: 0,
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
        backgroundColor: "border-basic-color-4",
        marginVertical: 20
    },
});

// Colors for confetti cannon
const confettiColors = ["#3366FF", "#4CAF50", "#FFC107", "#FF5722", "#9C27B0"];

export default ViewSun;

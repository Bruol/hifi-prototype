import React, { useState, useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, useStyleSheet } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import ConfettiCannon from 'react-native-confetti-cannon';

import { CoachMark } from '../components/CoachMark';
import Pog from '../assets/pog#2.png';

import { DataHandler } from '../data/DataHandler';
import ListHabitCard from '../components/ListHabitCard';
import UncheckModal from '../modals/UncheckHabitModal';
import CheckModal from '../modals/CheckHabitModal';
import Footer from '../components/Footer';

import { useNavigation } from '@react-navigation/native';

/**
 * This component renders the view for prototype A.
 * @param {object} confettiRef - Reference to confetti cannon component
 * @returns {JSX.Element}
 */
const ViewSun = () => {
    // its tutorial time baby
    const navigation = useNavigation();

    const [step, setStep] = useState(0);
    const text =
    step === 0
    ? "Hi. I'm Pog. I can show you around"
    : step === 1
    ? "This is where your Habits will be displayd"
    : step === 2
    ? "Let's create our first Habit"
    : step === 3
    ? "This will be your Habit name"
    : step === 4
    ? "This will be your Habit name"
    : step === 5
    ? "Change your Habit icon here"
    : "";

    const x_coordinate = step === 0 ? 50 : (
                         step === 1 ? 200: (
                         step === 2 ? 80 : 100));


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
        <>
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

        {step === 0 ? (
        <CoachMark
            shape="circle"
            x = {100}
            y = {100}
            radius={x_coordinate}
            />
        ) : step === 2  ? (
        <CoachMark
            shape="circle"
            x={0}
            y={0}
            radius={x_coordinate}
            />

        ): step === 3  ? (
            <CoachMark
                shape="circle"
                x={60}
                y={300}
                radius={x_coordinate}
                />
            )  
        : step === 4  ? (
            <CoachMark
                shape="circle"
                x={300}
                y={60}
                radius={70}
                />
            ) :null}
       
        {step < 5 && (
        <View style={themedStyles.instructionContainer}>

          <Text style={themedStyles.text}>{text}</Text>
          <TouchableOpacity
            style={themedStyles.button}
            onPress={() => (step === 4)? (navigation.navigate("Habit Creation")) : (setStep(step + 1))}
          >
            <Text style={themedStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
        
        </>
    );
};
 // <img src={Pog} alt="Logo" />
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
    //tutorial stuff
    instructionContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "bold",
      },
      button: {
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#23a",
        margin: 16,
      },
      button: {
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#23a",
        color: "#fff",
        fontSize: 32,
        margin: 16,
      },
      buttonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
      },
      //fabius stuff
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

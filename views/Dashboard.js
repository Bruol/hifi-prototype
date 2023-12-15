import React, { useState, useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { Text, Card, useStyleSheet } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import ConfettiCannon from 'react-native-confetti-cannon';

import { CoachMark } from '../components/CoachMark';

import { DataHandler } from '../data/DataHandler';
import ListHabitCard from '../components/ListHabitCard';
import UncheckModal from '../modals/UncheckHabitModal';
import CheckModal from '../modals/CheckHabitModal';
import Footer from '../components/Footer';

import { useNavigation } from '@react-navigation/native';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

/**
 * This component renders the view for prototype A.
 * @param {object} confettiRef - Reference to confetti cannon component
 * @returns {JSX.Element}
 */
const Dashboard = ({ step, setStep, onOpenEditHabit, onOpenCreateHabit }) => {
    // its tutorial time baby
    const navigation = useNavigation();
    console.log(step);
    const text =
        step === 0
            ? "Hi!! I'm Pog. I can show you around!"
            : step === 1
                ? "Great!! This is where your Habits will be displayed"
                : step === 2
                    ? "Let's create our first        Habit       "
                    : step === 7
                        ? "And now you are ready to explore on your own!" :
                                step === 20
                                    ? "You can always find me here, when you miss me!" : "";

    // const x_coordinate = step === 0 ? 50 : (
    //     step === 1 ? 200 : (
    //         step === 2 ? 80 : 100));


    // Reference to confetti cannon component
    const confettiRef = useRef();

    const dataHandler = new DataHandler();
    const [pendingHabitIds, setPendingHabitIds] = useState(dataHandler.getPendingDataIds());
    const [completedHabitIds, setCompletedHabitIds] = useState(dataHandler.getCompletedDataIds());
    dataHandler.addOnPendingDataChangeListener(() => setPendingHabitIds(dataHandler.getPendingDataIds()));
    dataHandler.addOnCompletedDataChangeListener(() => setCompletedHabitIds(dataHandler.getCompletedDataIds()));

    // State for pending action 
    const [pendingAction, setPendingAction] = useState(null);
    // State for focus habit
    const [focusHabitId, setFocusHabitId] = useState(1);

    // State for check modal visibility
    const [isCheckModalVisible, setIsCheckModalVisible] = useState(false);

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
        setIsCheckModalVisible(true);
    });
    // Confirm button for checking habits 
    const handleCheck = () => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
        setIsCheckModalVisible(false);
    };

    // State for uncheck modal visibility 
    const [isUncheckModalVisible, setIsUncheckModalVisible] = useState(false);
    // Function to uncheck a habit 
    const uncheckHabit = useCallback((id) => {
        // Set focus to the habit
        setFocusHabitId(id);

        // Set the pending action
        setPendingAction(() => () => {
            // Set the habit to pending
            dataHandler.setHabitCompleted(id, false);
        });

        // Show uncheck modal
        setIsUncheckModalVisible(true);
    });
    // Confirm button for unchecking habits 
    const handleUncheck = () => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
        setIsUncheckModalVisible(false);
    };

    const handleClose = () => {
        // Handle the cancellation of checking/unchecking habits here
        setPendingAction(null);
        setIsCheckModalVisible(false);
        setIsUncheckModalVisible(false);
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
                                    <Image style={themedStyles.stretch}
                                        source={require('../assets/pog2.png')} />
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
                            isVisible={ isCheckModalVisible}
                            habitId={ focusHabitId}
                            handleCheck={handleCheck}
                            handleClose={handleClose}
                            handleEdit={() => {
                                setIsCheckModalVisible(false);
                                onOpenEditHabit(focusHabitId);
                            }}
                        />

                        {/* Modal for confirming unchecking habits */}
                        <UncheckModal
                            isVisible={isUncheckModalVisible}
                            habitId={focusHabitId}
                            handleUncheck={handleUncheck}
                            handleClose={handleClose}
                            handleEdit={() => {
                                setIsUncheckModalVisible(false);
                                onOpenEditHabit(focusHabitId);
                            }}
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
                    <Footer onOpenCreateHabit={onOpenCreateHabit} />
                </View>
            </View>

            
            {step === 0 ? (
                <CoachMark
                    shape="circle"
                    x={windowWidth / 2}
                    y={317}
                    radius={110}
                />
            ) : step === 1 ? (
                <CoachMark
                    x={10}
                    y={20}
                    shape="rect"
                    width={windowWidth - 20}
                    height={115}
                />)
                : step === 2 ? (
                    <CoachMark
                        shape="circle"
                        x={windowWidth / 2 }
                        y={721}
                        radius={50}
                    />)
                    : step === 7 ? (
                        <CoachMark
                            x={0}
                            y={0}
                            shape="rect"
                            width={0}
                            height={0} />

                    ) 
                        : step === 20 ? (
                            <CoachMark
                                shape="circle"
                                x={windowWidth - 20}
                                y={-50}
                                radius={100}
                            />
                        )
                            : null}

            {step < 21 && (
                <View style={themedStyles.instructionContainer}>
                    {(step === 0) ? <Image style={themedStyles.stretch}
                        source={require('../assets/pog_full_body.png')} /> : (
                        (step === 1) ? <Image style={themedStyles.stretch}
                            source={require('../assets/pog_wink.png')} /> :
                            (step === 7) ? <Image style={themedStyles.stretch}
                            source={require('../assets/pog2.png')} /> :
                            <Image style={themedStyles.stretch}
                                source={require('../assets/pog_tongue.png')} />)
                    }
                    <Text style={themedStyles.text}>{text}</Text>

                    <View style={styles.cardView}>
                        <TouchableOpacity
                            style={themedStyles.button}
                            onPress={() => (step === 0) ? (setStep(20)) : (step === 20) ? (setStep(0)) : (step === 7) ? (() => { navigation.navigate("Create Habit"); (setStep(step - 1)) })() : setStep(step - 1)}
                        >
                            {(step === 0) ? <Text style={themedStyles.buttonText}>Skip Tutorial!</Text> : (step === 20) ? <Text style={themedStyles.buttonText}>   Restart!   </Text> : <Text style={themedStyles.buttonText}>    Go Back!    </Text>}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={themedStyles.button}
                            onPress={() => (step === 2) ? (() => { navigation.navigate("Create Habit"); (setStep(step + 1)) })() : (step === 7) ? (() => {(setStep(20)) })() : (setStep(step + 1))}
                        >
                            <Text style={themedStyles.buttonText}>      Got it!      </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            )}
           

        </>
    );
};

Dashboard.propTypes = {
    step: PropTypes.number.isRequired,
    setStep: PropTypes.func.isRequired,
    onOpenEditHabit: PropTypes.func.isRequired,
    onOpenCreateHabit: PropTypes.func.isRequired,
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
        fontSize: 32,
        fontWeight: "bold",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#23a",
        color: "#fff",
        fontSize: 32,
        margin: 10,
    },
    invisibleButton: {
        borderRadius: 8,
        justifyContent: "center",
        backgroundColor: "#23a",
        color: "#fff",
        fontSize: 32,
        margin: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    stretch: {
        width: 180,
        height: 180,
    },
    // Fabius stuff
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

export default Dashboard;

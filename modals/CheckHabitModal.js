import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { DataHandler } from '../data/DataHandler';
import ProgressBar from '../components/ProgressBar';

/**
 * This component is used for the confirmation modal.
 * @param {Boolean} isVisible - Whether the modal is visible or not
 * @param {String} confirmText - The text to display at the top of the modal
 * @param {Function} handleCheck - The function to execute when the habit is checked
 * @param {Function} handleClose - The function to execute when the modal is closed
 * @returns {JSX.Element}
 */
const CheckModal = ({ habitId, isVisible, handleCheck, handleClose }) => {
    // Get themed styles
    const styles = useStyleSheet(themedStyles);

    // Get theme colors
    const theme = useTheme();
    const iconColor = theme['text-basic-color'];

    // Get habit data
    const dataHandler = new DataHandler();
    const habit = dataHandler.getHabitById(habitId);

    return (
        <Modal
            isVisible={isVisible}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onSwipeComplete={handleClose}
            onBackdropPress={handleClose}
            swipeDirection="down"
        >
            <View style={styles.card}>

                {/* Swipe bar */}
                <View style={styles.swipeBar} />

                {/* Habit title and icon */}
                <View style={styles.titleWrapper}>
                    <Text category='h5'>{habit.title}</Text>
                    <Icon name={habit.iconName} style={{ width: 32, height: 32 }} fill={iconColor} />
                </View>

                {/* Progress bar */}
                <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <ProgressBar
                        range={[0, habit.getTodaysGoal()]}
                        value={habit.getTodaysProgress()}
                        width={353}
                    />
                </View>

                {/* Small centered text explaining that habit is not checked yet */}
                <Text
                    appearance="hint"
                    category='s1'
                    style={{ textAlign: 'center', marginBottom: 20 }}
                >
                    You have not completed this habit yet!
                </Text>


                {/* Uncheck and edit buttons next to each other */}
                <View style={styles.flexRow}>
                    <Button
                        appearance="ghost"
                        status="info"
                        accessoryLeft={<Icon name='settings-outline' />}
                        onPress={() => Alert.alert("Not Implemented", "Editing habits is not part of the prototype.")}
                    >
                        Edit Habit
                    </Button>
                    <Button
                        status="success"
                        accessoryLeft={<Icon name='close-circle-outline' />}
                        onPress={handleCheck}
                    >
                        Check Habit
                    </Button>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Close button */}
                <Button
                    appearance="ghost"
                    accessoryLeft={<Icon name='corner-down-right-outline' style={{ width: 24, height: 24 }} />}
                    onPress={handleClose}
                >
                    Close Dialog
                </Button>

            </View>
        </Modal>
    );
};

// Property types of ConfirmationModal
CheckModal.propTypes = {
    habitId: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    handleCheck: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

// Component styling
const themedStyles = StyleSheet.create({
    card: {
        backgroundColor: 'background-basic-color-1',
        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 30,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    swipeBar: {
        width: 80,
        height: 4,
        backgroundColor: "border-basic-color-4",
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "border-basic-color-4",
        marginVertical: 10
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default CheckModal;

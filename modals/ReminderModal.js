import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { DataHandler } from '../data/DataHandler';
import ProgressBar from '../components/ProgressBar';

const CheckModal = ({ headerText, confirmButtonText, isVisible, handleConfirm, handleClose }) => {
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
                        onPress={handleConfirm}
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

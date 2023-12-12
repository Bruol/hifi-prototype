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
* @param {Function} handleUncheck - The function to execute when the habit is unchecked
* @param {Function} handleClose - The function to execute when the modal is closed
* @returns {JSX.Element}
*/
const UncheckModal = ({ habitId, isVisible, handleUncheck, handleClose }) => {
  // Get themed styles
  const styles = useStyleSheet(themedStyles);

  // Get theme colors
  const theme = useTheme();
  const iconColor = theme['text-basic-color'];

  // Get habit
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
      <View style={styles.wrapper}>

        {/* Swipe bar */}
        <View style={styles.swipeBar} />

        {/* Habit title and icon */}
        <View style={styles.flexRow}>
          <Text category='h5'>{habit.title}</Text>
          <Icon name={habit.iconName} style={styles.icon} fill={iconColor} />
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarWrapper}>
          <ProgressBar
            range={[0, habit.getTodaysGoal()]}
            value={habit.getTodaysProgress()}
            width={353} />
        </View>

        {/* Small centered text explaining that habit is already checked */}
        <Text category='s1' style={{ textAlign: 'center', marginBottom: 20 }}>You already completed this habit! 🎉</Text>

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
            appearance="ghost"
            status="danger"
            accessoryLeft={<Icon name='close-circle-outline' />}
            onPress={handleUncheck}
          >
            Uncheck Habit
          </Button>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Close button */}
        <Button
          accessoryLeft={<Icon name='corner-down-right-outline' />}
          onPress={handleClose}
        >
          Close Dialog
        </Button>
      </View>
    </Modal>
  );
};

// Property types of ConfirmationModal
UncheckModal.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    streak: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleUncheck: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// Component styling
const themedStyles = StyleSheet.create(
  {
    wrapper: {
      backgroundColor: "background-basic-color-1",
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
    progressBarWrapper: {
      marginTop: 10,
      marginBottom: 20
    },
    icon: {
      width: 30,
      height: 30,
    }
  }
);

export default UncheckModal;

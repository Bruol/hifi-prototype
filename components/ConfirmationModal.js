// Code by Fabius Grünhagen
// fabiusg@student.ethz.ch

import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

/**
 * This component is used for the confirmation modal.
 * @param {Boolean} isVisible - Whether the modal is visible or not
 * @param {String} confirmText - The text to display at the top of the modal
 * @param {Function} handleConfirm - The function to execute when the confirm button is pressed
 * @param {Function} handleCancel - The function to execute when the cancel button is pressed
 * @returns {JSX.Element}
 */
const ConfirmationModal = ({ isVisible, confirmText, handleConfirm, handleCancel }) => {
  return (
    <Modal isVisible={isVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }}>

        {/* Confirmation Text */}
        <Text category="p1">{confirmText}</Text>

        {/* Divider */}
        <View style={{ width: "100%", height: 1, backgroundColor: "#E4E9F2", marginVertical: 20 }} />

        {/* Confirmation Button */}
        <Button accessoryLeft={<Icon name='checkmark-outline' />} onPress={handleConfirm}>Confirm</Button>

        {/* Cancel button with cross icon */}
        <Button appearance="ghost" accessoryLeft={<Icon name='close-outline' />} onPress={handleCancel}>Cancel</Button>

        {/* Divider */}
        <View style={{ width: "100%", height: 1, backgroundColor: "#E4E9F2", marginVertical: 10 }} />

        {/* Settings Button */}
        <Button appearance="ghost" accessoryLeft={<Icon name='settings-outline' />} onPress={() => alert("Settings are not part of the prototype.")}>Settings</Button>
      </View>
    </Modal>
  );
};

// Property types of ConfirmationModal
ConfirmationModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  confirmText: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;

import React, { useState } from 'react';
import { View, StyleSheet, Alert, TimePicker } from 'react-native';
import { Button, Icon, Text, useStyleSheet, useTheme, Datepicker } from '@ui-kitten/components';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';

const ReminderModal = ({ isVisible, isEdit = false, handleConfirm, handleClose, handleDelete }) => {
    const [date, setDate] = useState(new Date());

    // Get theme
    const theme = useTheme();
    // Get themed styles
    const styles = useStyleSheet(themedStyles);

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

                {/* Habit title */}
                <Text category='h5'>{isEdit ? "Edit Reminder" : "Create Reminder"}</Text>

                {/* Spacer */}
                <View style={{ height: 20 }} />

                {/* Time picker */}
                <View style={styles.timePickerWrapper}>
                    <Datepicker
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                    />

                </View>

                {/* Spacer */}
                <View style={{ height: 20 }} />

                {/* Uncheck and edit buttons next to each other */}
                <View style={styles.flexRow}>
                    <Button
                        appearance="ghost"
                        status="info"
                        accessoryLeft={<Icon name="undo-outline" />}
                        onPress={handleClose}
                    >
                        Back
                    </Button>
                    <Button
                        status="success"
                        accessoryLeft={<Icon name="checkmark-outline" />}
                        onPress={() => handleConfirm(date)}
                    >
                        {isEdit ? "Save Changes" : "Create Reminder"}
                    </Button>
                </View>

                {/* Delete button if editing */}
                {isEdit &&
                    <>
                        {/* Divider */}
                        <View style={styles.divider} />
                        <Button
                            appearance="ghost"
                            status="danger"
                            accessoryLeft={<Icon name='trash-2-outline' />}
                            onPress={handleDelete}
                        >
                            Delete Reminder
                        </Button>
                    </>
                }

            </View>
        </Modal>
    );
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

export default ReminderModal;

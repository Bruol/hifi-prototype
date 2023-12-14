import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Icon, Text } from '@ui-kitten/components';

import ReminderModal from '../modals/ReminderModal';

// Format a date object as hh:mm
function getFormattedTime(time) {

    // Extract day, month, and year
    let hour = time.getHours();
    let minute = time.getMinutes();

    // Ensure two-digit format for hours and minutes
    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;

    // Format the time as hh:mm
    return hour + ':' + minute;
}

const ReminderSelector = ({ reminders, setReminders }) => {
    // States
    const [focusedReminderIndex, setFocusedReminderIndex] = useState('');
    const [showReminderDialog, setShowReminderDialog] = useState(false);
    const [isReminderEdit, setIsReminderEdit] = useState(false);

    const openEditReminderModal = (index) => {
        setFocusedReminderIndex(index);
        setIsReminderEdit(true);
        setShowReminderDialog(true);
    }

    const openCreateReminderModal = () => {
        setFocusedReminderIndex(null);
        setIsReminderEdit(false);
        setShowReminderDialog(true);
    }

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'baseline' }}>
                <Text category="label" appearance="hint" style={{ marginBottom: 4 }}>Reminders</Text>
                <Text category="c1" appearance='hint'>Tap to edit</Text>
            </View>

            {/* Reminder list */}
            <FlatList
                data={reminders}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Button
                            status="basic"
                            appearance='outline'
                            onPress={() => {
                                openEditReminderModal(index);
                            }}
                            style={[
                                { width: "100%", borderRadius: 0, borderTopWidth: 0 },
                                (index === 0) ? { borderTopWidth: 1, borderTopLeftRadius: 4, borderTopRightRadius: 4 } : {},
                                (index === reminders.length - 1) ? { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 } : {}
                            ]}
                        >
                            {getFormattedTime(item)}
                        </Button>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            {/* Add reminder button */}
            <Button
                appearance='ghost'
                status='basic'
                accessoryLeft={<Icon name='plus-outline' />}
                onPress={openCreateReminderModal}
            >
                Add New Reminder
            </Button>

            {/* Reminder dialog */}
            <ReminderModal
                isVisible={showReminderDialog}
                isEdit={isReminderEdit}
                handleCreate={(timeStamp) => {
                    setShowReminderDialog(false);
                    setReminders([...reminders, timeStamp]);
                }}
                handleEdit={(timeStamp) => {
                    setShowReminderDialog(false);
                    setReminders(reminders.map((item, index) => index === focusedReminderIndex ? timeStamp : item));
                }}
                handleClose={() => {
                    setShowReminderDialog(false);
                }}
                handleDelete={() => {
                    setShowReminderDialog(false);
                    setReminders(reminders.filter((item, index) => index !== focusedReminderIndex));
                }}
            />
        </>
    );
};

export default ReminderSelector;


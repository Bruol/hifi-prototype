import React, { useState } from 'react';
import { StyleSheet, FlatList, Dimensions, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import CoachMark from '../components/CoachMark';

import { Input, Icon, Button, Modal, Card, Text, useStyleSheet, Layout } from '@ui-kitten/components';
import { useNavigation, useTheme } from '@react-navigation/native';

import { DataHandler, Habit } from '../data/DataHandler';
import ReminderModal from '../modals/ReminderModal';



const NumericInput = ({ value, setValue, isEdit = false, lowerLimit = 1, upperLimit = 100 }) => {

    const theme = useTheme();

    const increment = () => {
        let intValue = parseInt(value, 10);
        if (intValue < upperLimit) {
            setValue(intValue + 1);
        }
    };

    const decrement = () => {
        let intValue = parseInt(value, 10);
        if (intValue > lowerLimit) {
            setValue(intValue - 1);
        }
    };

    const handleInputChange = (text) => {
        if (/^\d+$/.test(text)) {
            let intValue = parseInt(text, 10);
            if (intValue > upperLimit) {
                intValue = upperLimit;
            } else if (intValue < lowerLimit) {
                intValue = lowerLimit;
            }
            setValue(intValue);
        }
    };

    return (
        <View>
            <Text category="label" appearance="hint" style={{ marginBottom: 4 }}>Repititions</Text>
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                <Button
                    status="basic"
                    appearance='outline'
                    onPress={decrement}
                    accessoryLeft={<Icon name={"minus-outline"} />}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, height: 30 }} />
                <Input
                    value={value.toString()}
                    onChangeText={handleInputChange}
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={{ flexGrow: 1, textAlign: 'center', borderRadius: 0 }}
                    textStyle={{ textAlign: 'center' }}
                />
                <Button
                    status="basic"
                    appearance='outline'
                    onPress={increment}
                    accessoryLeft={<Icon name={"plus-outline"} />}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: 30 }} />
            </View>
        </View>
    );
};

function HabitCreation({ step, setStep }) {
    const [title, setTitle] = useState('');
    const [iconName, setIconName] = useState('archive-outline');
    const [dailyReps, setDailyReps] = useState(1);
    const [reminders, setReminders] = useState([]);

    const [reminder, setReminder] = useState('');

    const [showIconDialog, setShowIconDialog] = useState(false);
    const [showReminderDialog, setShowReminderDialog] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const dataHandler = new DataHandler();

    const navigation = useNavigation();

    const createHabit = ({ step, setStep }) => {
        // Create and add new habit
        const habit = new Habit(title, iconName, reminders, dailyReps, 0);
        dataHandler.addHabit(habit);
        // Navigate back to home screen
        navigation.goBack();
    };

    const abort = () => {
        // Navigate back to home screen
        navigation.goBack();
    };

    const openReminderDialog = (index) => {
        setReminder(reminders[index]);
        setEdit(true);
        setShowReminderDialog(true);
    }

    const iconNames = [
        'activity-outline',
        'alert-circle-outline',
        'alert-triangle-outline',
        'archive-outline',
        'arrow-back-outline',
        'arrow-circle-down-outline',
        'arrow-circle-left-outline',
        'arrow-circle-right-outline',
        'arrow-circle-up-outline',
        'arrow-down-outline',
        'arrow-downward-outline',
        'arrow-forward-outline',
        'arrow-ios-back-outline',
        'arrow-ios-downward-outline',
        'arrow-ios-forward-outline',
        'arrow-ios-upward-outline',
        'arrow-left-outline',
        'arrow-right-outline',
        'arrow-up-outline',
        'arrow-upward-outline',
        'arrowhead-down-outline',
        'arrowhead-left-outline',
        'arrowhead-right-outline',
        'arrowhead-up-outline',
        'at-outline',
        'attach-outline',
        'attach-2-outline',
        'award-outline',
        'backspace-outline',
        'bar-chart-outline',
        'bar-chart-2-outline',
        'battery-outline',
        'behance-outline',
        'bell-outline',
        'bell-off-outline',
        'bluetooth-outline',
    ];

    // Get themed styles
    const styles = useStyleSheet(themedStyles);

    //tutorial stuff
    const getText = () => {
        switch (step) {
            case 4:
                return "this shouldnt be visible";
            case 5:
                return "This is were you set you Habit name";
            case 6:
                return "Here you can set your Habit icon";
            case 7:
                return "This is how often you want to check your Habit per Day";
            case 8:
                return "And thats it's. you can confirm your habit here";
            case 9:
                return "Or discard it here";
            default:
                return "This text shouldnt be visible"
        }
    };

    return (
        <View style={styles.wrapper}>

            <Text category="h5" style={styles.sectionTitle}>Create A New Habit</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}>
                <Input
                    style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    label="Title"
                    placeholder="Insert title here..."
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Icon selection */}
                <View>
                    <Text category="label" style={styles.label}>Icon</Text>
                    <Button
                        style={{ height: 30, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        status='basic'
                        appearance='outline'
                        accessoryLeft={(props) => <Icon {...props} name={iconName} />}
                        onPress={() => setShowIconDialog(true)}
                    />
                </View>
            </View>
            <Modal
                visible={showIconDialog}
                backdropStyle={{ backgroundColor: 'transparent' }}
                onBackdropPress={() => setShowIconDialog(false)}
            >
                <Card disabled={true}>
                    <Text category="s1">Select an icon</Text>
                    <FlatList
                        data={iconNames}
                        numColumns={4} // adjust this as needed
                        renderItem={({ item }) => (
                            <Button
                                appearance={iconName === item ? 'outline' : 'ghost'}
                                accessoryLeft={(props) => <Icon {...props} name={item} />}
                                onPress={() => {
                                    setIconName(item);
                                    setShowIconDialog(false);
                                }}
                            />
                        )}
                        keyExtractor={(item) => item}
                    />
                </Card>
            </Modal>

            {/* Spacer */}
            <View style={{ height: 20 }} />

            <NumericInput value={dailyReps} setValue={setDailyReps} />

            {/* Spacer */}
            <View style={{ height: 20 }} />

            <Text category="label" appearance="hint" style={styles.sectionTitle}>Reminders</Text>

            {/* Reminder list */}
            <FlatList
                data={reminders}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Button
                            status="basic"
                            appearance='outline'
                            onPress={() => {
                                openReminderDialog(index);
                            }}
                            style={[
                                { width: "100%", borderRadius: 0, borderTopWidth: 0 },
                                (index === 0) ? { borderTopWidth: 1, borderTopLeftRadius: 4, borderTopRightRadius: 4 } : {},
                                (index === reminders.length - 1) ? { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 } : {}
                            ]}
                        >
                            {index}: {item.toString()}
                        </Button>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            {/* Add reminder button */}
            <Button
                appearance="ghost"
                accessoryLeft={<Icon name='plus-outline' />}
                onPress={() => setShowReminderDialog(true)}
            >
                Add Reminder
            </Button>

            {/* Reminder dialog */}
            <ReminderModal
                isVisible={showReminderDialog}
                isEdit={isEdit}
                handleConfirm={(timeStamp) => {
                    setShowReminderDialog(false);
                    setReminders([...reminders, timeStamp]);
                    setEdit(false);
                }}
                handleClose={() => {
                    setShowReminderDialog(false);
                    setEdit(false);
                }}
                handleDelete={() => {
                    setShowReminderDialog(false);
                    setReminders(reminders.filter((item) => item !== reminder));
                    setEdit(false);
                }}
            />

            {/* Divider */}
            <View style={styles.divider} />

            <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-end" }}>
                <Button
                    appearance='ghost'
                    onPress={abort}
                    accessoryLeft={<Icon name="undo-outline" />}
                    style={{ marginRight: 20 }}
                >
                    Back
                </Button>
                <Button
                    onPress={createHabit}
                    accessoryLeft={<Icon name='checkmark-outline' />}
                >
                    Create Habit
                </Button>
            </View>
        </View>
    );
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
    wrapper: {
        flex: 1,
        padding: 20,
    },
    label: {
        color: 'text-hint-color',
        marginBottom: 4
    },
    selectedIcon: {
        borderColor: 'blue', // change this to the color you want
        borderWidth: 2,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "border-basic-color-4",
        marginVertical: 20
    },
    sectionTitle: {
        marginVertical: 10
    }
});

export default HabitCreation;

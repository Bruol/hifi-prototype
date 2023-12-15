import React, { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Input, Icon, Button, Modal, Card, Text, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { CoachMark } from '../components/CoachMark';

import { DataHandler, Habit } from '../data/DataHandler';
import ReminderSelector from '../components/ReminderSelector';
import NumericInput from '../components/NumericInput';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function HabitEditing({ step, setStep, focusedHabitId }) {
    // States
    const dataHandler = new DataHandler();
    const focusedHabit = dataHandler.getHabitById(focusedHabitId);
    if (!focusedHabit) {
        console.error("HabitEditing: Habit with id " + focusedHabitId + " not found!");
    }
    const [title, setTitle] = useState(focusedHabit.title);
    const [iconName, setIconName] = useState(focusedHabit.iconName);
    const [repetitions, setRepetitions] = useState(focusedHabit.repetitions);
    const [reminders, setReminders] = useState(focusedHabit.reminders);
    const [showIconDialog, setShowIconDialog] = useState(false);

    const editHabit = () => {
        const newHabit = new Habit(title, iconName, reminders, repetitions, focusedHabit.completions);
        dataHandler.replaceHabit(focusedHabitId, newHabit);
        navigateBack();
    };

    const deleteHabit = () => {
        dataHandler.removeHabit(focusedHabitId);
        navigateBack();
    };

    const navigation = useNavigation();
    const navigateBack = () => {
        navigation.goBack();
    };

    // Get themed styles
    const styles = useStyleSheet(themedStyles);

    const getText = () => {
        switch (step) {
            case 10:
                return "It's just like the Habit Creation";
            case 11:
                return "But this is where you can delete a Habit";
            case 12:
                return "That's it. Now you are ready!";
            default:
                return "This text shouldn't be visible"
        }
    };

    return (
        <>
            <View style={styles.wrapper}>

                <Text category="h5" style={styles.sectionTitle}>
                    Edit Existing Habit
                </Text>

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

                <NumericInput lowerLimit={focusedHabit.completions + 1} value={repetitions} setValue={setRepetitions} />

                {/* Spacer */}
                <View style={{ height: 20 }} />

                {/* Reminder selector */}
                <ReminderSelector reminders={reminders} setReminders={setReminders} />

                {/* Divider */}
                <View style={styles.divider} />

                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <Button
                        appearance='ghost'
                        status="danger"
                        onPress={navigateBack}
                        accessoryLeft={<Icon name="arrow-back" />}
                    >
                        Cancel Changes
                    </Button>
                    <Button
                        status='success'
                        onPress={editHabit}
                        accessoryLeft={<Icon name='checkmark-outline' />}
                    >
                        Save Changes
                    </Button>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Delete habit button */}
                <Button
                    appearance='ghost'
                    status="danger"
                    onPress={deleteHabit}
                    accessoryLeft={<Icon name="trash-2-outline" />}
                    style={{ marginBottom: 40 }}
                >
                    Delete Habit
                </Button>
            </View >

            {step === 10 ? (
                <CoachMark
                    x={10}
                    y={20}
                    shape="rect"
                    width={windowWidth - 20}
                    height={300}
                />
            ) : step === 11 ? (
                <CoachMark
                    x={windowWidth/2 - 150}
                    y={windowHeight - 180}
                    shape="rect"
                    width={300}
                    height={80}
                />)
                : step === 12 ? (
                    <CoachMark
                        x={70}
                        y={windowHeight - 240}
                        shape="rect"
                        width={0}
                        height={0}
                    />)
                        : null}

            {step < 20 && (
                <View style={themedStyles.instructionContainer}>
                    {(step === 11) ? <Image style={themedStyles.stretch}
                        source={require('../assets/pog_closed_eyes.png')} />
                        : (step === 12) ? <Image style={themedStyles.stretch}
                            source={require('../assets/pog2.png')} /> :
                            <Image style={themedStyles.stretch}
                                source={require('../assets/pog_full_body.png')} />
                    }
                    <Text style={themedStyles.text}>{getText()}</Text>

                    <View style={styles.cardView}>
                        <TouchableOpacity
                            style={themedStyles.button}
                            onPress={() => (step === 10) ? (() => { navigation.navigate("Dashboard"); (setStep(step - 1)) })() : setStep(step - 1)}
                        >
                            <Text style={themedStyles.buttonText}>    Go Back!    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={themedStyles.button}
                            onPress={() => (step === 12) ? (() => { navigation.navigate("Dashboard"); (setStep(20
                                )) })() : (setStep(step + 1))}
                        >
                            <Text style={themedStyles.buttonText}>      Got it!      </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            )}
        </>

    );
}

// Component properties
HabitEditing.propTypes = {
    step: PropTypes.number.isRequired,
    setStep: PropTypes.func.isRequired,
    focusedHabitId: PropTypes.number.isRequired,
};


const horizontalFlex = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}

const themedStyles = StyleSheet.create({
    // tutorial stuff
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
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#23a",
        margin: 16,
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
    cropped: {
        width: 135,
        height: 110,
    },
    cardView: {
        ...horizontalFlex,
        width: "100%",
    },
    // Fabius stuff
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

export default HabitEditing;

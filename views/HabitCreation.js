import React, { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Input, Icon, Button, Modal, Card, Text, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { DataHandler, Habit } from '../data/DataHandler';
import ReminderSelector from '../components/ReminderSelector';
import NumericInput from '../components/NumericInput';

function HabitCreation() {
    // States
    const [title, setTitle] = useState('');
    const [iconName, setIconName] = useState('archive-outline');
    const [repetitions, setRepetitions] = useState(10);
    const [reminders, setReminders] = useState([]);
    const [showIconDialog, setShowIconDialog] = useState(false);

    const createHabit = () => {
        const habit = new Habit(title, iconName, reminders, repetitions, 0);
        new DataHandler().addHabit(habit);
        navigateBack();
    };

    const navigation = useNavigation();
    const navigateBack = () => {
        navigation.goBack();
    };

    // Get themed styles
    const styles = useStyleSheet(themedStyles);

    //Tutorial stuff
    const getText = () => {
        switch (step) {
            case 3:
                return "You can type in a Habit name and choose an Icon here!!";
            case 4:
                return "You do some Habit more than once a day: Like Teeth brushing!";
            case 5:
                return "You can add as lots of reminders here. Just pick a time.";
            case 6:
                return "If you are Happy with your habit press here to confirm it";
            default:
                return "This text shouldn't be visible"
        }
    };

    return (
        <View style={styles.wrapper}>

            <Text category="h5" style={styles.sectionTitle}>
                Create A New Habit
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

                <NumericInput value={repetitions} setValue={setRepetitions} />

            {/* Spacer */}
            <View style={{ height: 20 }} />

            {/* Reminder selector */}
            <ReminderSelector reminders={reminders} setReminders={setReminders} />

            {/* Divider */}
            <View style={styles.divider} />

                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: 40 }}>
                    <Button
                        appearance='ghost'
                        status="danger"
                        onPress={navigateBack}
                        accessoryLeft={<Icon name="arrow-back" />}
                        style={{ marginRight: 20 }}
                    >
                        Discard Habit
                    </Button>
                    <Button
                        status='success'
                        onPress={createHabit}
                        accessoryLeft={<Icon name='checkmark-outline' />}
                    >
                        Create Habit
                    </Button>
                </View>
            </View>


            {step === 3 ? (
                <CoachMark
                    x={10}
                    y={20}
                    shape="rect"
                    width={windowWidth - 20}
                    height={120}
                />
            ) : step === 4 ? (
                <CoachMark
                    x={10}
                    y={140}
                    shape="rect"
                    width={windowWidth - 20}
                    height={80}
                />)
                : step === 5 ? (
                    <CoachMark
                        x={70}
                        y={windowHeight - 275}
                        shape="rect"
                        width={windowWidth - 140}
                        height={40}
                    />)
                    : step === 6 ? (
                        <CoachMark
                            x={windowWidth/2 + 5 }
                            y={windowHeight - 220}
                            shape="rect"
                            width={windowWidth/2 - 10}
                            height={90}
                        />)
                        : null}

            {step < 7 && (
                <View style={themedStyles.instructionContainer}>
                    {(step === 5) ? <Image style={themedStyles.cropped}
                        source={require('../assets/pog_head_cropped.png')} />
                        : (step === 4) ? <Image style={themedStyles.stretch}
                            source={require('../assets/pog_head.png')} /> :
                            <Image style={themedStyles.stretch}
                                source={require('../assets/pog_full_body.png')} />
                    }
                    <Text style={themedStyles.text}>{getText()}</Text>

                    <View style={styles.cardView}>
                        <TouchableOpacity
                            style={themedStyles.button}
                            onPress={() => (step === 3) ? (() => { navigation.navigate("Dashboard"); (setStep(step - 1)) })() : setStep(step - 1)}
                        >
                            <Text style={themedStyles.buttonText}>    Go Back!    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={themedStyles.button}
                            onPress={() => (step === 6) ? (() => { navigation.navigate("Dashboard"); (setStep(step + 1)) })() : (setStep(step + 1))}
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
HabitCreation.propTypes = {
    step: PropTypes.number.isRequired,
    setStep: PropTypes.func.isRequired,
};

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
        paddingHorizontal: 8,
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
    cardView: {
        ...horizontalFlex,
        width: "100%",
    },
    stretch: {
        width: 180,
        height: 180,
    },
    cropped: {
        width: 135,
        height: 110,
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

export default HabitCreation;

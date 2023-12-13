import React, { useState } from 'react';
import { StyleSheet, FlatList, Dimensions, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Input, Icon, Button, Modal, Card, Text, useStyleSheet, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import CoachMark from '../components/CoachMark';

import { DataHandler, Habit } from '../data/DataHandler';

const NumericInput = ({ value, setValue }) => {
    const increment = () => {
        let intValue = parseInt(value, 10);
        if (intValue < 1440) {
            setValue(intValue + 1);
        }
    };

    const decrement = () => {
        let intValue = parseInt(value, 10);
        if (intValue > 1) {
            setValue(intValue - 1);
        }
    };

    const handleInputChange = (text) => {
        if (/^\d+$/.test(text)) {
            let intValue = parseInt(text, 10);
            if (intValue > 1440) {
                intValue = 1440;
            } else if (intValue < 1) {
                intValue = 1;
            }
            setValue(intValue);
        }
    };

    return (
        <View>
            <Text category="label" style={{ marginBottom: 4 }}>Repititions</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    status="basic"
                    appearance='outline'
                    onPress={decrement}
                    accessoryLeft={<Icon name={"minus-outline"} />}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, height: 30, width: 30 }} />
                <Input
                    value={value.toString()}
                    onChangeText={handleInputChange}
                    keyboardType='numeric'
                    style={{ width: 100, textAlign: 'center', borderRadius: 0 }}
                    textStyle={{ textAlign: 'center' }}
                />
                <Button
                    status="basic"
                    appearance='outline'
                    onPress={increment}
                    accessoryLeft={<Icon name={"plus-outline"} />}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: 30, width: 30 }} />
            </View>
        </View>
    );
};

function HabitCreation({step, setStep}) {
    const [title, setTitle] = useState('');
    const [iconName, setIconName] = useState('archive-outline');
    const [frequency, setFrequency] = useState('1');
    
    const [showIconDialog, setShowIconDialog] = useState(false);
    const [showReminderDialog, setShowReminderDialog] = useState(false);

    const dataHandler = new DataHandler();

    const navigation = useNavigation();

    const createHabit = ({step, setStep}) => {
        // Create and add new habit
        const habit = new Habit(title, iconName, [], frequency, 0);
        dataHandler.addHabit(habit);
        // Navigate back to home screen
        navigation.goBack();
    };

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
    const text =
    step === 4
    ? "this shouldnt be visible"
    : step === 5
    ? "This is were you set you Habit name"
    : step === 6
    ? "Here you can set your Habit icon"
    : step === 7
    ? "This is how often you want to check your Habit per Day"
    : step === 8
    ? "And thats it's. you can confirm your habit here"
    : step === 9
    ? "Or discard it here"
    : "filler text";

    return (
        <>
        <View style={styles.wrapper}>

            <Text category="h5" style={styles.sectionTitle}>Basic Properties</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}>
                <Input
                    style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
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

            <NumericInput value={frequency} setValue={setFrequency} />

            {/* Divider */}
            <View style={styles.divider} />

            <Text category="h5" style={styles.sectionTitle}>Reminders</Text>


            {/* Divider */}
            <View style={styles.divider} />

            <Button title="Create Habit" onPress={createHabit} >
                Create Habit
            </Button>
        </View>

        {step === 4 ? (
        <CoachMark
            shape="circle"
            x = {100}
            y = {100}
            radius={50}
            />
        ) : step === 5  ? (
        <CoachMark
            shape="circle"
            x={0}
            y={0}
            radius={100}
            />

        ): step === 6  ? (
            <CoachMark
                shape="circle"
                x={60}
                y={300}
                radius={20}
                />
            )  
        : step === 7  ? (
            <CoachMark
                shape="circle"
                x={300}
                y={60}
                radius={5}
                />
        )  : step === 8  ? (
                <CoachMark
                    shape="circle"
                    x={300}
                    y={60}
                    radius={70}
                    />
                )
        : step === 9  ? (
                    <CoachMark
                        shape="circle"
                        x={300}
                        y={60}
                        radius={70}
                        />
                    ) :null}

        {step < 10 && (
        <View style={themedStyles.instructionContainer}>

          <Text style={themedStyles.text}>{text}</Text>
          <TouchableOpacity
            style={themedStyles.button}
            onPress={() => (step === 10)? (() => {navigation.navigate("Dashboard Sun"); (setStep(step + 1))})() : (setStep(step + 1))}
          >
            <Text style={themedStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
      
        </>
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

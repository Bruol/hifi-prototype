import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Text, Card, Button, IconRegistry, Icon } from '@ui-kitten/components';

import { pendingData, completedData } from "./HabitData";
import { HabitCard } from "./HabitCard";

/* Main App Component */
const App = () => {
	/* State containing list of pending habits */
	const [pendingHabits, setPendingHabits] = useState(pendingData);
	/* State containing list of completed habits */
	const [completedHabits, setCompletedHabits] = useState(completedData);

	/* Function to complete a habit */
	const completeHabit = useCallback((id) => {
		/* Find the habit */
		const habit = pendingHabits.find((habit) => habit.id === id);

		/* Remove the habit from the pending list */
		setPendingHabits(pendingHabits.filter((habit) => habit.id !== id));

		/* Add the habit to the completed list */
		setCompletedHabits([{ ...habit, streak: habit.streak + 1 }, ...completedHabits]);
	});

	/* Function to uncomplete a habit */
	const uncompleteHabit = useCallback((id) => {
		/* Find the habit */
		const habit = completedHabits.find((habit) => habit.id === id);

		/* Remove the habit from the completed list */
		setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));

		/* Add the habit to the pending list */
		setPendingHabits([{ ...habit, streak: habit.streak - 1 }, ...pendingHabits]);
	});

	/* Return the app */
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<StatusBar barStyle="dark-content" />
			<ApplicationProvider {...eva} theme={eva.light}>
				{/* Header */}
				<View style={styles.header}>
					<Text category="h4">Dashboard</Text>

					{/* Date selector with icon */}
					<Button appearance="ghost" status="info" size="medium" accessoryRight={(props) => <Icon {...props} name="calendar-outline" />}>Today</Button>
				</View>

				{/* Page content */}
				<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'spread', paddingHorizontal: 20, paddingTop: 20 }}>

					{/* Subheader for pending habits */}
					<View style={styles.cardView}>
						<Text category="h5">Pending Habits</Text>

						{/* Text to explain checking */}
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text category="c1">Tap to check</Text>
						</View>
					</View>

					{/* List of pending habits */}
					{pendingHabits.map((habit) => <HabitCard key={habit.id} habit={habit} status="warning" onPress={() => completeHabit(habit.id)} />)}

					{/* Divider */}
					<View style={styles.divider} />

					{/* Subheader for complete habits */}
					<View style={styles.cardView}>
						<Text category="h5">Completed Habits</Text>

						{/* Text to explain unchecking */}
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text category="c1">Tap to uncheck</Text>
						</View>
					</View>

					{/* List of completed habits */}
					{completedHabits.map((habit) => <HabitCard key={habit.id} habit={habit} status="success" onPress={() => uncompleteHabit(habit.id)} />)}
				</ScrollView>

				{/* Footer */}
				<View style={styles.footer}>
					<Button appearance="ghost" status="info" size="small">Settings</Button>
					<Button appearance="ghost" status="info" size="small">About</Button>
				</View>
			</ApplicationProvider >
		</>
	);
};

const styles = StyleSheet.create({
	cardView: {
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	divider: {
		width: "100%",
		height: 1,
		backgroundColor: "#E4E9F2",
		marginVertical: 20
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 10,
		backgroundColor: "#F7F9FC",
		borderBottomColor: "#E4E9F2",
		borderBottomWidth: 1
	},
	dateSelector: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#F7F9FC"
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 20,
		backgroundColor: "#F7F9FC",
		borderTopColor: "#E4E9F2",
		borderTopWidth: 1
	}
});

export default App;


import React, { useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, Text, Card, Button, IconRegistry, Icon, useTheme } from '@ui-kitten/components';

/* Main App Component */
const App = () => {
	/* State containing list of pending habits */
	const [habits, pendingHabits] = useState([
		{
			id: 0,
			title: "Drink Water",
			icon: "droplet-outline",
			streak: 8,
			goal: 82,
		},
		{
			id: 3,
			title: "Exercise",
			icon: "activity-outline",
			streak: 21,
			goal: 31,
		},
		{
			id: 4,
			title: "Read",
			icon: "book-outline",
			streak: 6,
			goal: 16,
		},
		{
			id: 5,
			title: "Meditate",
			icon: "sun-outline",
			streak: 4,
			goal: 11,
		},
		{
			id: 7,
			title: "Sleep Early",
			icon: "moon-outline",
			streak: 0,
			goal: 9,
		},
	]);

	/* State containing list of completed habits */
	const [completedHabits, setCompletedHabits] = useState([
		{
			id: 1,
			title: "Wake Up Early",
			icon: "sun-outline",
			streak: 1,
			goal: 15,
		},
		{
			id: 2,
			title: "Eat Healthy",
			icon: "heart-outline",
			streak: 1,
			goal: 24,
		},
		{
			id: 6,
			title: "Learn Something New",
			icon: "bulb-outline",
			streak: 1,
			goal: 51,
		},
	]);

	/* Function to complete a habit */
	const completeHabit = useCallback((id) => {
		/* Find the habit */
		const habit = habits.find((habit) => habit.id === id);

		/* Remove the habit from the pending list */
		pendingHabits(habits.filter((habit) => habit.id !== id));

		/* Add the habit to the completed list */
		setCompletedHabits([...completedHabits, { ...habit, streak: habit.streak + 1 }]);
	});

	/* Function to uncomplete a habit */
	const uncompleteHabit = useCallback((id) => {
		/* Find the habit */
		const habit = completedHabits.find((habit) => habit.id === id);

		/* Remove the habit from the completed list */
		setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));

		/* Add the habit to the pending list */
		pendingHabits([...habits, { ...habit, streak: habit.streak - 1 }]);
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

					{/* List of pending habits */}
					<View style={styles.cardView}>
						<Text category="h5">Pending Habits</Text>

						{/* Text to explain checking */}
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text category="c1">Tap to check</Text>
						</View>
					</View>
					{habits.map((habit) => (
						<Card key={habit.id} style={styles.card} status="warning" onPress={() => completeHabit(habit.id)}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<Icon name={habit.icon} fill="#8F9BB3" style={{ width: 32, height: 32 }} />
								<Text category="h6">{habit.title}</Text>

								{/* Progress */}
								<View style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
									{/* Show streak and goal value */}
									<View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2 }}>
										<Text category="h5">{habit.streak}</Text>
										<Text category="p1" style={{ color: "#8F9BB3" }}>/{habit.goal}</Text>
									</View>

									{/* Progress bar */}
									<View style={{ width: 50, height: 8, backgroundColor: "#E4E9F2", borderRadius: 4 }}>
										<View style={{ width: Math.max((habit.streak / habit.goal) * 50, 8), height: 8, backgroundColor: "#FFC107", borderRadius: 4 }} />
									</View>
								</View>

							</View>
						</Card>
					))}

					{/* Divider */}
					<View style={styles.divider} />

					{/* List of completed habits */}
					<View style={styles.cardView}>
						<Text category="h5">Completed Habits</Text>

						{/* Text to explain unchecking */}
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text category="c1">Tap to uncheck</Text>
						</View>
					</View>
					{completedHabits.map((habit) => (
						<Card key={habit.id} style={styles.card} status="success" onPress={() => uncompleteHabit(habit.id)}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<Icon name={habit.icon} fill="#8F9BB3" style={{ width: 32, height: 32 }} />
								<Text category="h6">{habit.title}</Text>

								{/* Progress */}
								<View style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
									{/* Show streak and goal value */}
									<View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2 }}>
										<Text category="h5">{habit.streak}</Text>
										<Text category="p1" style={{ color: "#8F9BB3" }}>/{habit.goal}</Text>
									</View>

									{/* Progress bar */}
									<View style={{ width: 50, height: 8, backgroundColor: "#E4E9F2", borderRadius: 4 }}>
										<View style={{ width: Math.max((habit.streak / habit.goal) * 100, 8), height: 8, backgroundColor: "#FFC107", borderRadius: 4 }} />
									</View>
								</View>

							</View>
						</Card>
					))}
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
	card: {
		width: "100%",
		marginVertical: 10
	},
	cardView: {
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	icon: {
		width: 32,
		height: 32
	},
	scrollView: {
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20
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


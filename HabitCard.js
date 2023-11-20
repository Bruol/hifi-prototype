import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Icon, Text } from "@ui-kitten/components";

/* Habit Card */
const HabitCard = ({ habit, status, onPress }) => (
    <Card key={habit.id} style={styles.card} status={status} onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Icon name={habit.icon} fill="#8F9BB3" style={styles.icon} />
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
);

const styles = StyleSheet.create(
    {
        card: {
            width: "100%",
            marginVertical: 10
        },
        icon: {
            width: 25,
            height: 25
        },
    }
)

export { HabitCard }


import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Icon, Text, useTheme, useStyleSheet } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

/**
 * This component is used for the small cards in dashboard B.
 * @param {Object} habit - The habit to display
 * @param {String} status - The status of the card
 * @param {Function} onPress - The function to execute when the card is pressed
 * @returns {JSX.Element}
 */
const SmallHabitCard = ({ habit, status, onPress }) => {
    // Get theme colors
    const theme = useTheme();
    const iconColor = theme['text-hint-color'];

    // Get themed styles
    const styles = useStyleSheet(themedStyles);

    return (
        <Card status={status} style={styles.card} onPress={onPress}>
            {/* Habit icon and title */}
            <View style={styles.content}>
                <Icon
                    name={habit.icon}
                    style={styles.icon}
                    fill={iconColor}
                />
                <Text
                    category='s1'
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode='middle'
                >
                    {habit.title}
                </Text>
            </View>

            {/* Habit progress bar */}
            <ProgressBar
            range={[0, habit.goal]}
            isShowingNumbers={false}
            value={habit.streak}
            width={100} 
        />
    </Card>
);
}

// Property types for small card component
SmallHabitCard.propTypes = {
    habit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        streak: PropTypes.number.isRequired,
        goal: PropTypes.number.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

// Component styles
const themedStyles = StyleSheet.create({
    card: {
        margin: 10,
        width: 140,
        padding: 0
    },
    content: {
        height: 75,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: 32,
        height: 32
    },
    title: {
        flex: 1,
        textAlign: 'center',
        marginBottom: 5,
        color: 'text-hint-color'
    }
});

export default SmallHabitCard;

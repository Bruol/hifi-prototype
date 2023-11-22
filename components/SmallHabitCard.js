
import React from 'react';
import { View } from 'react-native';
import { Card, Icon, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

/**
 * This component is used for the small cards in dashboard B.
 * @param {Object} habit - The habit to display
 * @param {String} status - The status of the card
 * @param {Function} onPress - The function to execute when the card is pressed
 * @returns {JSX.Element}
 */
const SmallHabitCard = ({ habit, status, onPress }) => (
    <Card status={status} style={{ margin: 10, width: 150 }} onPress={onPress}>
        {/* First Row containing icon and title */}
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Icon name={habit.icon} style={{ width: 32, height: 32 }} />
            <Text category='h6' style={{ textAlign: 'center' }}>{habit.title}</Text>
            <ProgressBar range={[0, habit.goal]} isShowingNumbers={false} value={habit.streak} width={100} />
        </View>
    </Card>
);

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

export default SmallHabitCard;

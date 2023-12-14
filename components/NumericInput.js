import React from 'react';
import { View } from 'react-native';
import { Input, Icon, Button, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';

const NumericInput = ({ value, setValue, lowerLimit = 1, upperLimit = 99 }) => {
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

// Component properties
NumericInput.propTypes = {
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
    lowerLimit: PropTypes.number,
    upperLimit: PropTypes.number,
};

export default NumericInput;

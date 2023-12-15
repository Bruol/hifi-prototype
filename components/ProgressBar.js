import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import PropTypes from 'prop-types';

function lerpHexColors(color1, color2, factor) {
    const weight1 = 1 - factor;
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
  
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
  
    const r = Math.floor(r1 * weight1 + r2 * factor);
    const g = Math.floor(g1 * weight1 + g2 * factor);
    const b = Math.floor(b1 * weight1 + b2 * factor);
  
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

/**
 * This component is used to display current progress of a habit.
 * @param {Number} progress - The progress to display
 * @param {Boolean} isShowingNumbers - Whether the numbers should be displayed or not
 * @returns {JSX.Element}
 */
const ProgressBar = ({ range, value, isShowingNumbers = true, width = 50 }) => {

    // TODO: Remove debug logs
    console.log("ProgressBar:");
    console.log("> range: " + range);
    console.log("> value: " + value);
    console.log("> isShowingNumbers: " + isShowingNumbers);
    console.log("> width: " + width);

    // Get theme colors
    const theme = useTheme();
    const warningColor = theme['color-warning-500'];
    const successColor = theme['color-success-500'];
    const secondaryTextColor = theme['text-hint-color'];
    const barBackgroundColor = theme['background-basic-color-3'];

    // Calculate progress
    const progress = (value - range[0]) / (range[1] - range[0]);

    // Calculate color of progress bar
    let color = lerpHexColors(warningColor, successColor, progress);

    return (
        <View style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>

            {/* Streak and goal value (Only show if enabled) */}
            {
                isShowingNumbers &&
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2 }}>
                    <Text category="h5">{value}</Text>
                    <Text category="p1" style={{ color: secondaryTextColor }}>/{range[1]}</Text>
                </View>
            }

            {/* Progress bar */}
            <View style={{ width: width, height: 8, backgroundColor: barBackgroundColor, borderRadius: 4, overflow: "hidden" }}>
                <View style={{ width: width * progress, height: 8, backgroundColor: color, borderRadius: 4 }} />
            </View>
        </View>);
}

// Property types of ProgressBar
ProgressBar.propTypes = {
    range: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
    value: PropTypes.number.isRequired,
    isShowingNumbers: PropTypes.bool,
    width: PropTypes.number
};

export default ProgressBar;

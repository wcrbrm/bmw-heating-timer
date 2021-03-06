import React from 'react';
import { Clock, Arrow, Digit } from './Clock';
import { Numeric } from './../shortcuts/';

const hours12 = [
    "12", "1", "2", "3", "4", "5", 
    "6", "7", "8", "9", "10", "11"
];
const hours24 = [
    "00", "13", "14", "15", "16", "17", 
    "18", "19", "20", "21", "22", "23"
];

// 1) draw line to the current hour (use angle, radius)
// 2) draw circle at the current hour (use angle, radius)
// 3) draw labels on bigger radius (iterate hours 12 - 11)
// 3) draw labels on smaller radius (iterate hours 00 - 23)
const HourSelector = ({ value, onChange, onReady }) => {
    const angleIndex = ((value > 12) ? (value - 12) : value);
    const r1 = 125;
    const r2 = 80;
    const negate = x => ((x < 0) ? 12 + x : x);
    const getHourFromAngle = (angle, radius) => {
        const plus12 = (radius <= r2 + 20) ? 12 : 0
        return plus12 + (negate(Math.round((angle - 2*Math.PI) * 12 / 360))) % 12;
    }
    return (
        <Clock onReady={onReady} onCoord={({ angle, radius }) => (onChange(getHourFromAngle(angle, radius)))}>
            <Numeric {...{value, onChange}} max={24} />
            <Arrow {...{angleIndex, angleDiv: 12, r: (value < 12) ? r1 : r2}} />
            {hours12.map((value, angleIndex) => <Digit {...{value, angleIndex, angleDiv: 12, key: value, r: r1 }} />)}
            {hours24.map((value, angleIndex) => <Digit {...{value, angleIndex, angleDiv: 12, key: value, r: r2 }} />)}
        </Clock>
    );
}

export default HourSelector;
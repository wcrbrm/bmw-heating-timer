import React from 'react';
import { Clock, Arrow, Digit } from './Clock';

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
const HourSelector = ({ value, onChange }) => {
    const a = 0; // todo: from value
    const r1 = 250;
    const r2 = 90;
    return (
        <Clock onCoord={({angle, radius}) => (console.log('a=', angle, 'r=', radius))}>
            <Arrow {...{a, r: r1}} />
            {hours12.map((value, angleIndex) => <Digit {...{value, angleIndex, key: value, r: r1 }} />)}
            {hours24.map((value, angleIndex) => <Digit {...{value, angleIndex, key: value, r: r2 }} />)}
        </Clock>
    );
}

export default HourSelector;
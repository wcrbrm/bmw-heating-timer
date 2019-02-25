import React from 'react';
import { Clock, Arrow, Digit } from './Clock';

const minutes = [
    "00", "05", "10", "15", "20", "25", 
    "30", "35", "40", "45", "50", "55"
];

// 1) draw line to the current minute
// 2) draw circle at the current minute
// 3) draw labels (iterate minutes)
const MinuteSelector = ({ value, onChange }) => {
    const a = 0; // todo: from value
    const r = 250; // todo: 
    return (
        <Clock onCoord={({angle, radius}) => (console.log('a=', angle, 'r=', radius))}>
            <Arrow {...{a, r}} />
            {minutes.map((value, angleIndex) => <Digit {...{value, angleIndex, key: value, r }} />)}
        </Clock>
    );
}

export default MinuteSelector;
import React from 'react';
import { Clock, Arrow, Digit } from './Clock';

const minutes = [
    "00", "05", "10", "15", "20", "25", 
    "30", "35", "40", "45", "50", "55"
];

// 3) draw labels (iterate minutes)
const MinuteSelector = ({ value, onChange }) => {
    const r = 125; 
    const negate = x => ((x < 0) ? 60 + x : x);
    const getMinuteFromAngle = (angle) => (negate(parseInt((angle - 2*Math.PI) * 60 / 360, 10)))
    return (
        <Clock onCoord={({ angle }) => (onChange(getMinuteFromAngle(angle)))}>
            <Arrow {...{angleDiv: 60, angleIndex: value, r}} />
            {minutes.map((value, min) => <Digit {...{value, angleIndex: min*5, angleDiv: 60, key: value, r }} />)}
        </Clock>
    );
}

export default MinuteSelector;
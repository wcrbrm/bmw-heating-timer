import React from 'react';
// import styled from 'styled-components';
import { Clock } from './Clock';

const minutes = [
    "00", "05", "10", "15", "20", "25", 
    "30", "35", "40", "45", "50", "55"
];

// 1) draw line to the current minute
// 2) draw circle at the current minute
// 3) draw labels
const MinuteSelector = ({ value, onChange }) => {
    const on = console.log
    return (
        <Clock onCoord={on}>
            Minute: {value}
        </Clock>
    );
}

export default MinuteSelector;
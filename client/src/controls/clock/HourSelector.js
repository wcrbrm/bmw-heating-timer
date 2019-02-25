import React from 'react';
// import styled from 'styled-components';
import { Clock } from './Clock';

const HourSelector = ({ value, onChange }) => {
    return (
        <Clock>
            Hour: {value}
        </Clock>
    );
}

export default HourSelector;
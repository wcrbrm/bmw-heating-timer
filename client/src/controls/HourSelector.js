import React from 'react';
import styled from 'styled-components';

const Clock = styled.div`
    width: 300px;
    height: 300px;
    border: 1px #a00 solid;
`;

const HourSelector = ({ value, onChange }) => {
    return (
        <Clock>
            Hour: {value}
        </Clock>
    );
}

export default HourSelector;
import React from 'react';
import styled from 'styled-components';

const Clock = styled.div`
    width: 300px;
    height: 300px;
    border: 1px red solid;
`;

const MinuteSelector = ({ value, onChange }) => {
    return (
        <Clock>
            Minute: {value}
        </Clock>
    );
}

export default MinuteSelector;
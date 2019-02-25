import React from 'react';
import styled from 'styled-components';

const ClockDiv = styled.div`
    width: 300px;
    height: 300px;
    margin: 0px auto;
    border: 1px red solid;
    position: relative;
`;

const getAngle = ({ x, y }) => (-90 + Math.atan2(y, x) * 180 / Math.PI );
const getRadius = ({ x, y }) => (Math.sqrt(x * x + y * y));

export const Clock = ({ size = 300, onCoord, children }) => (
    <ClockDiv 
        onClick={e => {
            const { offsetX, offsetY } = e.nativeEvent;
            const x = - offsetX + size / 2;
            const y = - offsetY + size / 2;
            const angle = getAngle({ x, y });
            const radius = getRadius({ x, y });
            onCoord({ offsetX, offsetY, x, y, angle, radius })
        }}>
        {children}
    </ClockDiv>
);

const ArrowDiv = styled.div`
    position: absolute;
    z-index: 1;
`;
export const Arrow = ({ size = 300, angle, radius }) => (
    <ArrowDiv>
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
        </svg>
    </ArrowDiv>
);

const DigitDiv = styled.div`
    position: absolute;
    color: white;
    z-index: 2;
`;
export const Digit = ({ size = 300, value, angleIndex, r }) => (
    <DigitDiv>
        {value}
    </DigitDiv>
);
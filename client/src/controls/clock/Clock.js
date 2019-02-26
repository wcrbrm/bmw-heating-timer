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

export const Clock = ({ size = 300, onCoord, children }) => {
    const handle = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const x = - offsetX + size / 2;
        const y = - offsetY + size / 2;
        const angle = getAngle({ x, y });
        const radius = getRadius({ x, y });
        onCoord({ offsetX, offsetY, x, y, angle, radius })
    };
    return (
        <ClockDiv onMouseDown={handle} onMouseMove={handle}>
            {children}
        </ClockDiv>
    );
}

const ArrowDiv = styled.div`
    position: absolute;
    z-index: 1;
`;
export const Arrow = ({ size = 300, color = '#a00', angleIndex, r }) => {
    const x = r * Math.cos((angleIndex * 60 - 90) * Math.PI / 180);
    const y = r * Math.sin((angleIndex * 60 - 90) * Math.PI / 180);
    const cx = size / 2;
    const cy = size / 2;
    return (
        <ArrowDiv>
            <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
                <circle fill={color} cx={cx} cy={cy} r="5"/>
                <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} stroke={color} />
                <circle fill={color} cx={cx + x} cy={cy + y} r="20"/>
                <text anchor='middle' fill='white' x={cx + x} y={cy + y}>{angleIndex}</text>
            </svg>
        </ArrowDiv>
    );
}

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
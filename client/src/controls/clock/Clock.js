import React from 'react';
import styled from 'styled-components';

const ClockDiv = styled.div`
    width: 300px;
    height: 300px;
    margin: 0px auto;
    position: relative;
    cursor: pointer;
    * { user-select: none; }
`;

const getAngle = ({ x, y }) => (-90 + Math.atan2(y, x) * 180 / Math.PI );
const getRadius = ({ x, y }) => (Math.sqrt(x * x + y * y));


export class Clock extends React.Component {
    state = {
        selecting: false
    }
    stop = () => {
        this.setState({ selecting: false });
        if (typeof this.props.onReady === 'function') this.props.onReady()
    }
    // TODO: mouse move and touch move should be replaced with attached event listener
    render() {
        const { size = 300, onCoord, children } = this.props;
        const movedTo = (offsetX, offsetY) => {
            if (isNaN(offsetX) || typeof offsetX === 'undefined') return;
            if (isNaN(offsetY) || typeof offsetY === 'undefined') return;
            const x = - offsetX + size / 2;
            const y = - offsetY + size / 2;
            const angle = getAngle({ x, y });
            const radius = getRadius({ x, y });
            onCoord({ offsetX, offsetY, x, y, angle, radius })
        }
        const touch = (e, started) => {
            if (started) this.setState({ selecting: true });
            if (started || this.state.selecting) {
                const { clientX, clientY } = e.touches[0];
                movedTo( clientX, clientY );
            }
        }
        const handle = (e, started) => {
            if (started) this.setState({ selecting: true });
            if (started || this.state.selecting) {
                const { offsetX, offsetY } = e.nativeEvent;
                movedTo( offsetX, offsetY );
            }
        };
        // const handleTouch = (e) =>
        return (
            <ClockDiv 
                onTouchStart={e => touch(e, true)}
                onTouchEnd={() => this.stop()}
                onTouchMove={e => touch(e, true)}
                onMouseDown={e => handle(e, true)}
                onMouseMove={e => handle(e, false)}
                onMouseUp={() => this.stop()}
            >
                {children}
            </ClockDiv>
        );
    }
}

const ArrowDiv = styled.div`
    position: absolute;
    z-index: 1;
    pointer-events: none;
    * { pointer-events: none; }
`;
export const Arrow = ({ size = 300, color = '#a00', angleIndex, angleDiv, r }) => {
    const degree = angleIndex * 360 / angleDiv - 90;
    const x = r * Math.cos(degree * Math.PI / 180); // <-- still wrong
    const y = r * Math.sin(degree * Math.PI / 180); // <-- still wrong
    // console.log("angleIndex=", angleIndex, "x=", x, "y=", y);
    const cx = size / 2;
    const cy = size / 2;
    return (
        <ArrowDiv>
            <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
                <circle fill={color} cx={cx} cy={cy} r="5"/>
                <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} stroke={color} />
                <circle fill={color} cx={cx + x} cy={cy + y} r="20"/>
                {/*<text anchor='middle' fill='white' x={cx + x} y={cy + y}>{angleIndex}</text>*/}
            </svg>
        </ArrowDiv>
    );
}

const DigitDiv = styled.div`
    position: absolute;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    color: white;
    text-shadow: 1px 0px 35px #eee;
    
    z-index: 2;
    left: ${props => props.x - 32}px;
    top: ${props => props.y - 16}px;
    height: 32px;
    line-height: 32px;
    width: 64px;
    opacity: 0.8;

    pointer-events: none;
`;
export const Digit = ({ size = 300, value, angleIndex, angleDiv, r }) => {
    const degree = angleIndex * 360 / angleDiv - 90;
    const x = r * Math.cos(degree * Math.PI / 180); // <-- still wrong
    const y = r * Math.sin(degree * Math.PI / 180); // <-- still wrong
    const cx = size / 2;
    const cy = size / 2;
    return (<DigitDiv x={cx + x} y={cy + y}>{value}</DigitDiv>);
}
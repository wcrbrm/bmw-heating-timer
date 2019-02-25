import React from 'react';
import styled from 'styled-components';

const DayWrapper = styled.div`
    margin: 5px;
    display: flex;
    justify-content: center;

`;
const Day = styled.button`
    color: #eee;
    border: none;
    border-radius: 4px;
    background: #000;
    margin: 5px;
    font-size: 12px;
    outline: none !important;
    cursor: pointer;
    padding-top: 3px;
    padding-bottom: 3px;
    &.active { background: darkgreen; color: white; }
`;

const dow = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
class DaysOfWeek extends React.Component {
    render() {
        const { value, onChange } = this.props;
        const isActive = d => (value.indexOf(d) > -1);
        const onToggle = d => {
            const index = value.indexOf(d);
            console.log('toggle d=', d, 'index=', index);
            if (index > -1) {
                const newval = value.slice();
                newval.splice(index, 1);
                onChange(newval);
            } else {
                const newval = value.slice();
                newval.push(d);
                onChange(newval);
            }
          
        }
        return (
            <DayWrapper>
                {dow.map((name, d) => (
                    <Day
                        onClick={() => (onToggle(d))} 
                        className={isActive(d) ? 'active' : ''} 
                        key={name}
                    >
                        {name}
                    </Day>
                ))}
            </DayWrapper>
        )
    }
}

export default DaysOfWeek;
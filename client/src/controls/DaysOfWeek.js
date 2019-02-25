import React from 'react';
import styled from 'styled-components';

const DayWrapper = styled.div`
    background: #eee;
    margin: 5px;
`;
const Day = styled.div`
    color: gray;
`;

const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
class DaysOfWeek extends React.Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <DayWrapper>
                {dow.map(d => (
                    <Day className="" key={d}>
                        {d}
                    </Day>
                ))}
            </DayWrapper>
        )
    }
}

export default DaysOfWeek;
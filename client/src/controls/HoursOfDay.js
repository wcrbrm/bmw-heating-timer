import React from 'react';
import styled from 'styled-components';
import Esc from './Esc';

const ActiveWrapper = styled.div`
    background: #eee;
    margin: 5px;
`;
const InActiveWrapper = styled.button`
    background: transparent;
    border: none;
    color: #eee;
    font-size: 48px; line-height: 48px;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    &:hover { color: #fff; background: #333; }
`;

const pad2 = x => ((x >= 10) ? x : ('0' + x));

class HoursOfDay extends React.Component {
    state = {
        editing: ''
    }
    startEditing = () => {
        this.setState({ editing: 'hours' });
    }
    stopEditing = () => {
        this.setState({ editing: '' });
    }
    render() {
        const { value, onChange } = this.props;
        const hour = value[0];
        const minute = value[1];
        const { editing } = this.state;
        if (!editing) {
            return (
                <InActiveWrapper onClick={() => this.startEditing()}>
                    {pad2(hour)} : {pad2(minute)}
                </InActiveWrapper>
            );
        }
        return (
            <ActiveWrapper>
                <Esc onPress={() => this.stopEditing()} />
                <div>
                    {pad2(hour)} : {pad2(minute)}
                </div>
            </ActiveWrapper>
        )
    }
}

export default HoursOfDay;
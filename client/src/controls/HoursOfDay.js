import React from 'react';
import styled from 'styled-components';
import Esc from './Esc';
import Enter from './Enter';
import { HourSelector, MinuteSelector } from './clock';

const ActiveWrapper = styled.div`
    background: transparent;
    margin: 5px;
    user-select: none;
`;
const InActiveWrapper = styled.div`
    background: transparent;
    border: none;
    color: #eee;
    font-size: 48px; line-height: 48px;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    outline: none !important;
    &:hover { color: #fff; background: #333; }
    &.disabled { color: #888; text-shadown: 0px 0px 10px #fff; }
`;
const Semi = styled.span`
    color: #aaa;
    margin-left: 3px;
    margin-right: 3px;
    user-select: none;
    &.preview {
        font-size: 48px; line-height: 48px;
    }
`;
const ModeButton = styled.button`
    background: transparent;
    border: none;
    color: #eee;
    font-size: 32px; line-height: 32px;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    outline: none !important;
    user-select: none;
    &.preview {
        font-size: 48px; line-height: 48px;
    }
    &.active { background: #a00; color: white; }
`;

const pad2 = x => ((x >= 10) ? x : ('0' + x));

class HoursOfDay extends React.Component {
    state = {
        editing: ''
    }
    startEditing = ({ mode = 'hours', event }) => {
        this.setState({ editing: mode });
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    stopEditing = () => {
        this.setState({ editing: '' });
    }
    render() {
        const { enabled, value, onChange } = this.props;
        const hour = value[0];
        const minute = value[1];
        const { editing } = this.state;
        if (!editing || !enabled) {
            const enabledClass = enabled ? '' : 'disabled ';
            return (
                <InActiveWrapper className={enabledClass}>
                    <Enter onPress={() => (enabled && this.startEditing({ mode: 'hour' }))} />
                    <ModeButton 
                        className="preview"
                        onClick={() => (enabled && this.startEditing({ mode: 'hour' }))}
                    >
                        {pad2(hour)}
                    </ModeButton>
                    <Semi className="preview">:</Semi>
                    <ModeButton
                        className="preview"
                        onClick={() => (enabled && this.startEditing({ mode: 'minute'}))}
                    >
                        {pad2(minute)}
                    </ModeButton>
                </InActiveWrapper>
            );
        }
        return (
            <ActiveWrapper>
                <Esc onPress={() => this.stopEditing()} />
                <Enter onPress={() => this.stopEditing()} />
                <div onClick={() => this.stopEditing()}>
                    <ModeButton 
                        className={editing === 'hour' ? 'active': ''} 
                        onClick={event => this.startEditing({ mode: 'hour', event }) }
                    >
                        {pad2(hour)}
                    </ModeButton>
                    <ModeButton
                        className={editing === 'minute' ? 'active': ''}
                        onClick={event => this.startEditing({ mode: 'minute', event }) }
                    >
                        {pad2(minute)}
                    </ModeButton>
                </div>
                
                {(editing === 'hour' ? (
                    <HourSelector value={hour} onChange={v => onChange([v, minute])} />
                ): false)}
                {(editing === 'minute' ? (
                    <MinuteSelector value={minute} onChange={v => onChange([hour, v])} />
                ): false)}
            </ActiveWrapper>
        )
    }
}

export default HoursOfDay;
import React from 'react';
import styled from 'styled-components';
import { Enter, Esc } from './shortcuts/';
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
    onChangeHour = () => {
        setTimeout(() => {
            this.setState({ editing: 'minute' });
        }, 200);
    }
    onChangeMinute = () => {
        setTimeout(() => {
            this.stopEditing();
        }, 200);
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
                    <div>
                        <Enter onPress={this.onChangeHour} />,
                        <HourSelector 
                            value={hour} onReady={this.onChangeHour}
                            onChange={v => onChange([v, minute])}
                            />
                    </div>
                ): false)}
                {(editing === 'minute' ? (
                    <div>
                        <Enter onPress={this.onChangeMinute} />,
                        <MinuteSelector
                            value={minute} onReady={this.onChangeMinute}
                            onChange={v => onChange([hour, v])}   
                            />
                    </div>
                ): false)}
            </ActiveWrapper>
        )
    }
}

export default HoursOfDay;
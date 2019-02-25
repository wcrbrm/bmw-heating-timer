import React from 'react';
import styled from 'styled-components';
import logo from './bmw.svg';
import './App.css';
import Switch from "react-switch";
import DaysOfWeek from './controls/DaysOfWeek';
import HoursOfDay from './controls/HoursOfDay';

const StatusLabel = styled.div`
  text-align: center;
  color: white;
  font-size: 12px;
  line-height: 30px;
`;

class App extends React.Component {
  state = {
    enabled: true,
    daysOfWeek: [1, 2, 3, 4, 5],
    time: [8, 0]
  }
  onChange = (field, value) => {
    this.setState({ [field] : value });
  }

  render() {
    const { enabled, daysOfWeek, time } = this.state;
    return (
      <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div style={{ width: 40 }}>&nbsp;</div>
            <div>
              <StatusLabel>STATUS</StatusLabel>
              <Switch 
                checked={enabled} 
                onChange={value => (this.onChange('enabled', value))}
              />
            </div>
        </header>
        <DaysOfWeek 
            enabled={enabled}
            value={daysOfWeek}
            onChange={value => (this.onChange('daysOfWeek', value))}
        />
        <HoursOfDay
            enabled={enabled || daysOfWeek.length === 0}
            value={time}
            onChange={value => (this.onChange('time', value))}
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './bmw.svg';
import './App.css';
import Switch from "react-switch";
import DaysOfWeek from './controls/DaysOfWeek';
import HoursOfDay from './controls/HoursOfDay';

class App extends React.Component {
  state = {
    enabled: false,
    daysOfWeek: [],
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
            <div style={{ width: 20 }}>&nbsp;</div>
            <div>
              Status:
              <br />
              <Switch 
                checked={enabled} 
                onChange={value => (this.onChange('enabled', value))}
              />
            </div>
        </header>
        <DaysOfWeek 
            value={daysOfWeek}
            onChange={value => (this.onChange('daysOfWeek', value))}
        />
        <HoursOfDay 
            value={time}
            onChange={value => (this.onChange('time', value))}
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;

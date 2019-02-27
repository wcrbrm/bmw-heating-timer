import React from 'react';

class Numeric extends React.Component {
  onKeyPress = (e) => {
    const { value, max, onChange } = this.props;
    const noMax = (typeof max === 'undefined');
    const noNeg = v => ((v >= 0) ? v : (noMax ? 0 : (max + v)));
    const modMax = v => (noMax ? noNeg(v) : noNeg(v) % max);
    
    if (e.keyCode === 38) { // arrow up
        onChange(modMax(value + 1));
    } else if (e.keyCode === 40) { // arrow down
        onChange(modMax(value - 1));
    } else {
        console.log("pressed" , e.keyCode)
    }
  };

  componentWillMount() {
    window.addEventListener("keydown", this.onKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    return false;
  }
}


export default Numeric;

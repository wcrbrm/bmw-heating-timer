import React from 'react';

class Esc extends React.Component {
  onKeyPress = (e) => {
    const { onPress, to } = this.props;
    if (e.keyCode === 27) {
        onPress({ to });
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


export default Esc;

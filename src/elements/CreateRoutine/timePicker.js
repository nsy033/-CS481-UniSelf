import React, { Component } from 'react';
import Picker from 'react-mobile-picker-scroll';
import './style.css';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        value: 0,
      },
      optionGroups: {
        value: props.value,
      },
    };
  }

  // Update the value in response to user picking event
  handleChange = (name, value) => {
    this.setState(({ valueGroups }) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
    }));
  };

  render() {
    const { optionGroups, valueGroups } = this.state;

    return (
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this.handleChange}
      />
    );
  }
}

export default TimePicker;

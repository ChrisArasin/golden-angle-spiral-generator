import React from 'react';
//value, handleChange, label
class SettingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({displayValue: nextProps.value});
  }

  handleInputChange(event){
    let value = event.target.value;

    //cant display just '.' if user starts typing that in number input, so using text input.
    // if there's a letter, or ends in .0*
    //display what you're typing, but don't update app state value
    if (!value || /[^.0-9]+/.test(value.toLowerCase()) || value.slice(-1) === '.' ||  /\.\d*0+$/.test(value.toLowerCase()) ){
      this.setState({displayValue: value})
      return;
    }
    const valAsNumber = parseFloat(value);
    this.setState({
      displayValue: value,
    });
    this.props.handleChange(valAsNumber);
  }

  replaceDisplayState(event){
    let value = event.target.value;
    if (!value) {
      value = 0;
    }
    const valAsNumber = parseFloat(value);
    this.props.handleChange(valAsNumber);
  }

  render() {
    let unitLabel = null;
    if (this.props.unit) {
      unitLabel = <small>({this.props.unit})</small>;
    }
    return (
      <div className="settings-input">
        <label>{this.props.label} {unitLabel}</label>
        <input type="text" value={this.state.displayValue} onBlur={this.replaceDisplayState.bind(this)} onChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }

}

export default SettingInput;

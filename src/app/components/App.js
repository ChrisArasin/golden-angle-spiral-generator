import React from 'react';
import Blossom from './Blossom';
import SettingInput from './SettingInput';
import SizeFunctionSelect from './SizeFunctionSelect';

const goldenAngle = 180 * (3 - Math.sqrt(5));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      numSeeds: 500,
      angle: goldenAngle,
      // angle: 10,
      r: 250,
      seedSize: 2,
      sizeOffset: 0,
      sizeFunction: 'none',
      sizeFunctionPeriods: 1,
      sizeFunctionAmplitude: 1,

      numSeedsAnimate: 0,
      angleAnimate: 0,
      rAnimate: 0,
      seedSizeAnimate: 0,
      sizeOffsetAnimate: 0,
      sizeFunctionPeriodsAnimate: 0,
      sizeFunctionAmplitudeAnimate: 0,
      isAnimating: false,
      intervalID: null
    }
  }

  toggleAnimation(event){
    event.preventDefault();

    if (! this.state.isAnimating) {

      let intervalID = setInterval(()=>{
        this.setState({
          numSeeds: this.state.numSeeds + this.state.numSeedsAnimate,
          angle: this.state.angle + this.state.angleAnimate,
          r: this.state.r + this.state.rAnimate,
          seedSize: this.state.seedSize + this.state.seedSizeAnimate,
          sizeOffset: this.state.sizeOffset + this.state.sizeOffsetAnimate,
          sizeFunctionPeriods: this.state.sizeFunctionPeriods + this.state.sizeFunctionPeriodsAnimate,
          sizeFunctionAmplitude: this.state.sizeFunctionAmplitude + this.state.sizeFunctionAmplitudeAnimate
        });
      }, 33);

      this.setState({intervalID: intervalID});
    } else {
      clearInterval(this.state.intervalID);
    }
    this.setState({
      isAnimating: ! this.state.isAnimating
    });

  }


  updateSetting(setting, value) {
    this.setState({
      [setting]: value
    });
  }

  render () {

    const sizeFunctionControls = this.state.sizeFunction === 'none' ? null : [
      <SettingInput key="sizeFunction01" label='Periods' value={this.state.sizeFunctionPeriods} handleChange={this.updateSetting.bind(this, 'sizeFunctionPeriods')} />,
      <SettingInput key="sizeFunction02" label='Amplitude' value={this.state.sizeFunctionAmplitude}  handleChange={this.updateSetting.bind(this, 'sizeFunctionAmplitude')} />,
      <SettingInput key="sizeFunction03" label='Offset' unit='rad' value={this.state.sizeOffset}  handleChange={this.updateSetting.bind(this, 'sizeOffset')} />
    ];

    const sizeFunctionAnimateControls = this.state.sizeFunction === 'none' ? null : [
      <div key="sizeFunctionAnimate00" className="settings-input" />,
      <SettingInput key="sizeFunctionAnimate01" label='Periods' value={this.state.sizeFunctionPeriodsAnimate} handleChange={this.updateSetting.bind(this, 'sizeFunctionPeriodsAnimate')} />,
      <SettingInput key="sizeFunctionAnimate02" label='Amplitude' value={this.state.sizeFunctionAmplitudeAnimate}  handleChange={this.updateSetting.bind(this, 'sizeFunctionAmplitudeAnimate')} />,
      <SettingInput key="sizeFunctionAnimate03" label='Offset' unit='rad' value={this.state.sizeOffsetAnimate}  handleChange={this.updateSetting.bind(this, 'sizeOffsetAnimate')} />
    ];

    return  (

      <div className="wrap">
        <form className="controls">
          <div className="controls-inner">
            <div className="row">
              <h3>Display</h3>
              <SettingInput label='Dot Count' value={this.state.numSeeds} handleChange={this.updateSetting.bind(this, 'numSeeds')} />
              <SettingInput label='Radius' value={this.state.r} unit='px' handleChange={this.updateSetting.bind(this, 'r')} />
              <SettingInput label='Angle' value={this.state.angle} unit='deg' handleChange={this.updateSetting.bind(this, 'angle')} />
              <SettingInput label='Dot Size' value={this.state.seedSize} unit='px' handleChange={this.updateSetting.bind(this, 'seedSize')} />
              <SizeFunctionSelect value={this.state.sizeFunction} handleChange={this.updateSetting.bind(this, 'sizeFunction')} />
              {sizeFunctionControls}
            </div>
            <div className="row">
              <h3>Animate</h3>
              <SettingInput label='Dot Count' value={this.state.numSeedsAnimate} handleChange={this.updateSetting.bind(this, 'numSeedsAnimate')} />
              <SettingInput label='Radius' value={this.state.rAnimate} unit='px' handleChange={this.updateSetting.bind(this, 'rAnimate')} />
              <SettingInput label='Angle' value={this.state.angleAnimate} unit='deg' handleChange={this.updateSetting.bind(this, 'angleAnimate')} />
              <SettingInput label='Dot Size' value={this.state.seedSizeAnimate} unit='px' handleChange={this.updateSetting.bind(this, 'seedSizeAnimate')} />
              {sizeFunctionAnimateControls}
              <button onClick={this.toggleAnimation.bind(this)}> {this.state.isAnimating ? 'Stop' : 'Start' }</button>
            </div>
          </div>

        </form>
        <Blossom numSeeds={this.state.numSeeds}
                 sizeOffset={this.state.sizeOffset}
                 angle={this.state.angle}
                 r={this.state.r}
                 seedSize={this.state.seedSize}
                 sizeFunction={this.state.sizeFunction}
                 sizeFunctionPeriods = {this.state.sizeFunctionPeriods}
                 sizeFunctionAmplitude = {this.state.sizeFunctionAmplitude}
                 />
      </div>
    );
  }
}

export default App;

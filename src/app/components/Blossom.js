import React from 'react';
import Seed from './Seed';

const Blossom = (props) => {

  const seeds = [];
  const period = props.sizeFunctionPeriods * 2 * Math.PI;

  //no seed at 0 because it's odd looking
  for (var i = 1; i < props.numSeeds + 1; i++) {
    seeds.push(<Seed {...props} key={'seed'+i} seedIndex={i}  period={period} />);
  }

  const size = props.r * 2 + props.seedSize + 10;

  return <div className="blossom-wrap"><svg width={size + 'px'} height={size + 'px'}>{seeds}</svg></div>;
};

export default Blossom;

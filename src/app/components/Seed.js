import React from 'react';

const toRadians = (angle) => (angle * (Math.PI / 180));

const Seed = ({seedIndex, numSeeds, r, angle, seedSize, sizeOffset, sizeFunction, period, sizeFunctionAmplitude}) => {

  const cAngle = seedIndex * angle;
  const distance = Math.sqrt(seedIndex / numSeeds) * r;
  const x = (distance * Math.cos(toRadians(cAngle))) + r;
  const y = (distance * Math.sin(toRadians(cAngle))) + r;

  const relativeDistance = (distance + sizeOffset) / r;

  let computedSize;

  switch (sizeFunction) {
    case 'none':
      computedSize = seedSize;
      break;
    case 'sine':
      computedSize = seedSize + Math.sin(  (relativeDistance * period)  + sizeOffset) * sizeFunctionAmplitude;
      break;
    case 'cosine':
      computedSize = seedSize + Math.cos(  (relativeDistance * period)  + sizeOffset) * sizeFunctionAmplitude;
      break;
    default:
      computedSize = seedSize;
  }

  //can't have negative r value
  if ( computedSize < 0) {
    computedSize = 0;
  }
  // const thisSize = seedSize;
  return <circle cx={x} cy={y} r={computedSize}  />;
};

export default Seed;

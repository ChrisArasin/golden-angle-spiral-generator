import React from 'react';
//value, handleChange, label
const SizeFunctionSelect = ({value, handleChange}) => {

  const handleSelect = (event) => {
    handleChange(event.target.value);
  };

  return (
    <div className="settings-input size-function-wrap">
      <label>Size Function</label>
      <select value={value} onChange={handleSelect}>
        <option value="none">None</option>
        <option value="sine">Sine</option>
        <option value="cosine">Cosine</option>
      </select>
    </div>
  );


}

export default SizeFunctionSelect;

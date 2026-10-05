import React from 'react';
export type ToggleSwitchProps = {
  checked: boolean;
  onChange: () => void;
}

export const ToggleSwitch = ({ checked, onChange } : ToggleSwitchProps) => {

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round">
      </span>
    </label>
  )
}
import React from 'react';
import { useState } from 'react';
import { Clear, Close } from "../Icon/Icon";

type SearchBarProps = {
  placeholder: string;
  handleChange: (value: string) => void;
  handleClear: () => void;
  active: boolean;
}

export const SearchBar = ({ placeholder, handleChange, handleClear, active } : SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleInput = (input: string) => {
    setValue(input);
    handleChange(input);
  };

  const handleSearchClear = () => {
    setValue('');
    handleClear();
  };

  return (
    <div className={`search-container ${active ? 'active' : 'hidden'}`}>
      <div className="search-wrapper">
        <input name="search" placeholder={placeholder} value={value} onChange={e => handleInput(e.target.value)} />
        <button className="clear-search" onClick={handleSearchClear}>
          <Close width={'24px'} height={'24px'} color="#888"/>
        </button>
      </div>
    </div>
  )
}
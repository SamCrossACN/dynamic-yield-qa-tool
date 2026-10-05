import React from 'react';

interface Props {
  active: boolean;
  onToggle: () => void;
  icon: React.JSX.Element;
}

export const IconButton = ({ active, onToggle, icon }: Props) => {
  return (
    <button className='tl-qa-button' data-active={active} onClick={onToggle}>
      {icon}
    </button>
  );
}

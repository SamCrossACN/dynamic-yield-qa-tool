import React from 'react';
import { useState } from 'react';
import { Chevron } from '../../elements/Icon/Icon';

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
}

export const Accordion = ({ title, children, defaultOpen = false, open: controlledOpen, onToggle }: Props) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={`accordion${open ? ' active' : ''}`}>
      <button className="accordion-header" onClick={handleToggle}>
        <span className="accordion-title">{title}</span>
        <span className="accordion-chevron">
          <Chevron />
        </span>
      </button>
      <div className="accordion-body">
        {children}
      </div>
    </div>
  );
}

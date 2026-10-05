import React from 'react';

export type ScreenProps = {
  body: React.JSX.Element;
  index: number;
  activeIndex: number;
}

export const Screen = ({ body, index, activeIndex }: ScreenProps) => {
  const offset = (index - activeIndex) * 100;
  return (
    <div className="screen" style={{ transform: `translateX(${offset}%)` }}>
      <div className="screen-body">
        {body}
      </div>
    </div>
  )
}
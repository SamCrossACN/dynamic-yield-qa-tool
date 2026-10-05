import React from 'react';
type LoadingProps = {
  active: boolean;
}

export const Loading = ({ active }: LoadingProps) => {
  return (
    <div className={`loading-container ${active && 'active'}`}>
      <div className="loading-text">Loading...</div>
      <div className="loading-bar">
        <div className="loader">
          <div className="loading"></div>
        </div>
      </div>
    </div>
  );
}
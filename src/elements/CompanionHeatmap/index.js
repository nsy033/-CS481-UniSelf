import './style.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';

import CompanionProfile from '../CompanionProfile';

function CompanionHeatmap(props) {
  const { list, fillings, selectedTimezone } = props;

  const displayHeatRow = () => {
    const row = [];
    for (let day = 0; day < 7; day++) {
      const achievement = Math.floor(Math.random() * 3);
      row.push(
        <div
          className="outline"
          style={
            achievement === 0
              ? fillings.gray
              : achievement === 1
              ? fillings.light
              : fillings.deep
          }
          key={day}
        ></div>
      );
    }

    return row;
  };

  return (
    <div className="heatmapContainer">
      {list
        .filter((companion) => {
          return (
            companion[selectedTimezone].length > 0 || companion['name'] === 'Me'
          );
        })
        .map((companion) => (
          <div className="heatUnit" key={companion['name'] + '-unit'}>
            <CompanionProfile
              info={companion}
              isMe={companion['name'] === 'Me'}
              timezone={selectedTimezone}
              key={companion.name}
            />
            <div className="emptySpace" key={companion['name'] + '-empty'} />
            <div className="heatRow" key={companion['name'] + '-row'}>
              {displayHeatRow()}
            </div>
          </div>
        ))}
    </div>
  );
}

export default CompanionHeatmap;

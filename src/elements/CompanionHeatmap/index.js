import './style.css';
import React, { useEffect, useState, useRef } from 'react';

import CompanionProfile from '../CompanionProfile';

function CompanionHeatmap(props) {
  const list = props.list;
  const colorsets = {
    morning: ['#FFCA2D', '#FFE9A9'],
    day: ['#8CD735', '#D8EDC0'],
    night: ['#3F51B5', '#CED3F0'],
    gray: '#EEEEEE',
  };
  const [selectedTimezone, setSelectedTimezone] = useState('morning');

  const emptyFilling = {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    float: 'left',
    background: '#FFFFFF',
    borderRadius: '50%',
  };
  const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
  deepFilling.background = colorsets[selectedTimezone][0];
  const lightFilling = JSON.parse(JSON.stringify(emptyFilling));
  lightFilling.background = colorsets[selectedTimezone][1];
  const grayFilling = JSON.parse(JSON.stringify(emptyFilling));
  grayFilling.background = colorsets['gray'];
  if (selectedTimezone === 'night') deepFilling['color'] = '#FFFFFF';

  const displayHeatRow = () => {
    const row = [];
    for (let day = 0; day < 7; day++) {
      const achievement = Math.floor(Math.random() * 3);
      row.push(
        <div
          className="outline"
          style={
            achievement === 0
              ? grayFilling
              : achievement === 1
              ? lightFilling
              : deepFilling
          }
        ></div>
      );
    }

    return row;
  };

  return (
    <div>
      <button onClick={() => setSelectedTimezone('morning')}>MORNING</button>
      <button onClick={() => setSelectedTimezone('day')}>DAY</button>
      <button onClick={() => setSelectedTimezone('night')}>NIGHT</button>

      <div className="heatmapContainer">
        {list
          .filter((companion) => {
            return (
              companion[selectedTimezone].length > 0 ||
              companion['name'] === 'Me'
            );
          })
          .map((companion) => (
            <div className="heatUnit">
              <CompanionProfile
                info={companion}
                isMe={companion['name'] === 'Me'}
                timezone={selectedTimezone}
                key={companion.name}
              />
              <div className="emptySpace" />
              <div className="heatRow">{displayHeatRow()}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CompanionHeatmap;

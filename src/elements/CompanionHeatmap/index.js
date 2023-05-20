import './style.css';
import React from 'react';

import CompanionProfile from '../CompanionProfile';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';

function CompanionHeatmap(props) {
  const { list, fillings, selectedTimezone } = props;

  const displayHeatRow = (rowForWhom) => {
    let routineResults = morningRoutineResults.filter(
      ({ userID }) => userID === rowForWhom
    );
    routineResults = routineResults.slice(routineResults.length - 7);

    const row = [];
    for (let day = 0; day < 7; day++) {
      let achievement = 0;
      if (selectedTimezone === 'morning') {
        const target = list.filter(({ userID }) => userID === rowForWhom)[0][
          'morning'
        ];
        const targetWakeUpTime = target['WakeUp'];
        const targetSNSUsage = target['SNSUsage'];

        const totalTimeForeground = routineResults[day]['totalTimeForeground'];
        const wakeUpTime = routineResults[day]['wakeUpTime'];

        if (totalTimeForeground <= targetSNSUsage) achievement++;
        if (
          new Date('1970-01-01 ' + wakeUpTime).getTime() <=
          new Date('1970-01-01 ' + targetWakeUpTime).getTime()
        )
          achievement++;
      } else {
        achievement = Math.floor(Math.random() * 3);
      }
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
            Object.keys(companion[selectedTimezone]).length > 0 ||
            companion['name'] === 'Me'
          );
        })
        .map((companion) => (
          <div className="heatUnit" key={companion['name'] + '-unit'}>
            <CompanionProfile
              info={companion}
              isMe={companion['name'] === 'Me'}
              timezone={selectedTimezone}
              key={companion.name}
              clickable={false}
            />
            <div className="emptySpace" key={companion['name'] + '-empty'} />
            <div className="heatRow" key={companion['name'] + '-row'}>
              {displayHeatRow(companion['userID'])}
            </div>
          </div>
        ))}
    </div>
  );
}

export default CompanionHeatmap;

import './style.css';
import React from 'react';

import CompanionProfile from '../CompanionProfile';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';

function CompanionHeatmap(props) {
  const { list, fillings, selectedTimezone } = props;

  const displayHeatRow = (rowForWhom) => {
    let routineResults;
    if (selectedTimezone === 'morning') {
      routineResults = morningRoutineResults.filter(
        ({ userID }) => userID === rowForWhom
      );
    } else {
      routineResults = dayRoutineResults.filter(
        ({ userID }) => userID === rowForWhom
      );
    }
    if (rowForWhom.includes('1'))
      routineResults = routineResults.slice(routineResults.length - 7);
    else if (rowForWhom.includes('2'))
      routineResults = routineResults.slice(6, 13);
    else if (rowForWhom.includes('3'))
      routineResults = routineResults.slice(7, 14);
    else
      routineResults = routineResults.slice(
        routineResults.length - 37,
        routineResults.length - 30
      );

    const row = [];
    for (let day = 0; day < 7; day++) {
      let achievement = 0;
      let achievementLevel = 0;
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

        achievementLevel = achievement / Object.keys(target).length;
      } else if (selectedTimezone === 'day') {
        const target = list.filter(({ userID }) => userID === rowForWhom)[0][
          'day'
        ];
        const targetStudyTime = target['study'];
        const targetUVExposure = target['UVExposure'];

        const studyTime = routineResults[day]['studyTime'];
        const UVExposureTime = routineResults[day]['UVExposureTime'];

        if (targetStudyTime <= studyTime) achievement++;
        if (
          new Date('1970-01-01 ' + UVExposureTime).getTime() <=
          new Date('1970-01-01 ' + targetUVExposure).getTime()
        )
          achievement++;

        achievementLevel = achievement / Object.keys(target).length;
      } else {
        achievement = Math.floor(Math.random() * 3);
        achievementLevel = achievement / 2;
      }

      row.push(
        <div
          className="outline"
          style={
            achievementLevel === 0
              ? fillings.gray
              : achievementLevel === 1
              ? fillings.deep
              : fillings.light
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

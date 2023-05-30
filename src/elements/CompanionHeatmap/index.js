import './style.css';
import React, { useEffect, useState } from 'react';

import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

import CompanionProfile from '../CompanionProfile';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';
import nightRoutineResults from '../../routineInfos/nightRoutineResults';

function CompanionHeatmap(props) {
  const { list, fillings, selectedTimezone } = props;

  function capitalize(timezone) {
    return timezone[0].toUpperCase() + timezone.slice(1);
  }

  const datesPre = ['08', '09', '10', '11', '12', '13', '14'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [tooltipMsg, setTooltipMsg] = useState('hello world');
  const handlePopoverOpen = (event) => {
    const msg = event.target.id.split('\\');
    const achievementLevel = msg[0] / msg[1];
    const numColor =
      achievementLevel === 0
        ? fillings.gray.background
        : achievementLevel === 1
        ? fillings.deep.background
        : fillings.light.background;

    let whose = 'my';
    for (let i = 1; i < list.length; i++) {
      if (list[i].userID === msg[4]) {
        whose = list[i].name + `'s`;
        break;
      }
    }
    setTooltipMsg(
      <div>
        <div className="tooltipTitle">
          How was <b>{whose} </b>{' '}
          {selectedTimezone === 'morning'
            ? ' Morning 🌻'
            : selectedTimezone === 'day'
            ? ' Day 🌈'
            : ' Night 🌙'}{' '}
          on <b>{msg[3]}</b>
        </div>
        <table className="tooltipTable">
          <tbody>
            <tr>
              <td className="firstCol"></td>
              <td className="secondCol" style={{ width: '170px' }}>
                <b>Actual Achievement</b>
              </td>
              <td className="thirdCol">
                <b>Total # of routines</b>
              </td>
            </tr>
            <tr>
              <td className="firstCol">
                <div className="tooltipIcon" style={{ background: numColor }}>
                  {' '}
                </div>
              </td>
              <td className="secondCol" style={{ width: '170px' }}>
                Achieved {msg[0]}
              </td>
              <td className="thirdCol">out of {msg[1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const displayHeatRow = (rowForWhom) => {
    let routineResults;
    if (selectedTimezone === 'morning')
      routineResults = morningRoutineResults.filter(
        ({ userID }) => userID === rowForWhom
      );
    else if (selectedTimezone === 'day')
      routineResults = dayRoutineResults.filter(
        ({ userID }) => userID === rowForWhom
      );
    else
      routineResults = nightRoutineResults.filter(
        ({ userID }) => userID === rowForWhom
      );

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
      let target = [];
      if (selectedTimezone === 'morning') {
        target = list.filter(({ userID }) => userID === rowForWhom)[0][
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
        target = list.filter(({ userID }) => userID === rowForWhom)[0]['day'];
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
        // console.log(rowForWhom, routineResults[day]);
        target = list.filter(({ userID }) => userID === rowForWhom)[0]['night'];
        const targetStep = target['step'];
        const totalStep = routineResults[day]['totalStep'];

        if (totalStep >= targetStep) achievement++;
        achievementLevel = achievement;
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
          id={`${achievement}\\${Object.keys(target).length}\\${capitalize(
            selectedTimezone
          )} routines\\19/05/${datesPre[day]}\\${rowForWhom}`}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          key={day}
        ></div>
      );
    }

    return row;
  };

  const weekdays = ['WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE'];
  const displayWeekdays = () => {
    let weekdayLabels = [
      <div style={{ minWidth: '210px', justifyContent: 'flex-start' }}>
        {capitalize(selectedTimezone)} Routiners
      </div>,
      <div className="emptySpace" />,
    ];
    weekdays.forEach((weekday, index) => {
      weekdayLabels.push(
        <div
          key={weekday}
          className={
            weekday === 'SUN'
              ? 'sunday'
              : weekday === 'SAT'
              ? 'saturday'
              : 'weekday'
          }
        >
          {weekday}
        </div>
      );
    });

    return weekdayLabels;
  };

  return (
    <div className="heatmapContainer">
      <div className="heatmapLabel">{displayWeekdays()}</div>
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

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            border: 0,
            width: '450px',
            height: '120px',
            bgcolor: 'background.paper',
          }}
        >
          <div className="tooltipContentsContainer">{tooltipMsg}</div>
        </Box>
      </Popover>
    </div>
  );
}

export default CompanionHeatmap;

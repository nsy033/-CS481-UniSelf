import './style.css';
import React, { useState, useEffect, useCallback } from 'react';
import COLORSETS from '../../constants/colorset';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import allUsersRoutine from '../../routineInfos/allUsersRoutine';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';
import nightRoutineResults from '../../routineInfos/nightRoutineResults';

function Calendar(props) {
  const { onPrevBtnClick, onNextBtnClick } = props;

  const URLSplit = window.document.URL.split('/');
  const timezone = URLSplit[URLSplit.length - 1];

  const MonthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [routineResults, setRoutineResults] = useState({});
  const [practicedDatesStr, setPracticedDatesStr] = useState([]);
  const [practicedDates, setPracticedDates] = useState([]);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const routineRes = {};
    if (timezone === 'morning') {
      morningRoutineResults = morningRoutineResults.filter(
        ({ userID }) => userID === 'USER1'
      );
      morningRoutineResults.forEach(
        ({ userID, date, totalTimeForeground, wakeUpTime }) => {
          routineRes[date] = { totalTimeForeground, wakeUpTime };
        }
      );

      const targetSNSUsage = allUsersRoutine['USER1']['morning']['SNSUsage'];
      const targetWakeUpTime = allUsersRoutine['USER1']['morning']['WakeUp'];
      setTargets([targetSNSUsage, targetWakeUpTime]);
    } else if (timezone === 'day') {
      dayRoutineResults = dayRoutineResults.filter(
        ({ userID }) => userID === 'USER1'
      );
      dayRoutineResults.forEach(
        ({ userID, date, UVExposureTime, studyTime }) => {
          routineRes[date] = { UVExposureTime, studyTime };
        }
      );

      const targetStudyTime = allUsersRoutine['USER1']['day']['study'];
      const targetUVExposure = allUsersRoutine['USER1']['day']['UVExposure'];
      setTargets([targetStudyTime, targetUVExposure]);
    } else {
      nightRoutineResults = nightRoutineResults.filter(
        ({ userID }) => userID === 'USER1'
      );
      nightRoutineResults.forEach(({ userID, date, totalStep }) => {
        routineRes[date] = { totalStep };
      });

      const targetStep = allUsersRoutine['USER1']['night']['step'];
      setTargets([targetStep]);
    }

    const dateStr = Object.keys(routineRes);
    const dates = dateStr.map(
      (str) => new Date(str).toISOString().split('T')[0]
    );
    setRoutineResults(routineRes);
    setPracticedDatesStr(dateStr);
    setPracticedDates(dates);
  }, []);

  const [timezoneStr, setTimezoneStr] = useState(
    timezone === 'morning'
      ? 'Morning 🌻'
      : timezone === 'day'
      ? 'Day 🌈'
      : 'Night 🌙'
  );
  const [dateStr, setDateStr] = useState('1st Jan');
  const [tooltipIcon, setTooltipIcon] = useState([
    COLORSETS['gray'],
    COLORSETS['gray'],
  ]);

  const [actualAchievements, setActualAchievements] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    const hoveredDate = event.target.firstChild.data;
    const lastChar = hoveredDate[hoveredDate.length - 1];
    setDateStr(
      `${hoveredDate}${
        lastChar === '1'
          ? 'st'
          : lastChar === '2'
          ? 'nd'
          : lastChar === '3'
          ? 'rd'
          : 'th'
      } ${MonthNames[selectedMonth - 1]}`
    );

    const thisDate = new Date(
      new Date(selectedYear, selectedMonth - 1, hoveredDate) -
        new Date().getTimezoneOffset() * 60000
    );
    const newTooltipIcon = [COLORSETS['gray'], COLORSETS['gray']];
    const actualContents = [0, 0];
    const thisDateStr = thisDate.toISOString().split('T')[0];

    if (practicedDates.includes(thisDateStr)) {
      const jsonIdx = practicedDates.indexOf(thisDateStr);

      if (timezone === 'morning') {
        const { totalTimeForeground, wakeUpTime } =
          routineResults[practicedDatesStr[jsonIdx]];
        actualContents[0] = totalTimeForeground;
        actualContents[1] = wakeUpTime;

        if (totalTimeForeground <= targets[0])
          newTooltipIcon[0] = COLORSETS[timezone][0];
        if (
          new Date(thisDateStr + 'T' + wakeUpTime).getTime() <=
          new Date(thisDateStr + 'T' + targets[1]).getTime()
        )
          newTooltipIcon[1] = COLORSETS[timezone][0];
      } else if (timezone === 'day') {
        const { studyTime, UVExposureTime } =
          routineResults[practicedDatesStr[jsonIdx]];

        actualContents[0] = studyTime;
        actualContents[1] = UVExposureTime;

        if (studyTime >= targets[0]) newTooltipIcon[0] = COLORSETS[timezone][0];
        if (
          new Date(thisDateStr + 'T' + UVExposureTime).getTime() <=
          new Date(thisDateStr + 'T' + targets[1]).getTime()
        )
          newTooltipIcon[1] = COLORSETS[timezone][0];
      } else {
        const { totalStep } = routineResults[practicedDatesStr[jsonIdx]];

        actualContents[0] = totalStep;

        if (totalStep >= targets[0]) newTooltipIcon[0] = COLORSETS[timezone][0];
      }
    }
    setActualAchievements(actualContents);
    setTooltipIcon(newTooltipIcon);

    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const emptyFilling = {
    textAlign: 'center',
    float: 'left',
    background: '#FFFFFF',
    borderRadius: '50%',
  };
  const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
  deepFilling.background = COLORSETS[timezone][0];
  const lightFilling = JSON.parse(JSON.stringify(emptyFilling));
  lightFilling.background = COLORSETS[timezone][1];
  const grayFilling = JSON.parse(JSON.stringify(emptyFilling));
  grayFilling.background = COLORSETS['gray'];
  if (timezone === 'night') deepFilling['color'] = '#FFFFFF';

  function isLeapYear(year) {
    if (year % 400 === 0) return true;
    else if (year % 100 === 0) return false;
    else if (year % 4 === 0) return true;
    return false;
  }

  function computeDaysInMonth(month, year) {
    if (month === 2) {
      if (isLeapYear(year)) return 29;
      else return 28;
    } else if (month === 4 || month === 6 || month === 9 || month === 11)
      return 30;
    return 31;
  }

  const today = {
    year: 2019, //오늘 연도
    month: 5, //오늘 월
    date: 14, //오늘 날짜
    day: 0, //오늘 요일
  };
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [dateTotalCount, setDateTotalCount] = useState(
    new Date(selectedYear, selectedMonth, 0).getDate()
  );

  let years = [];
  let months = [];
  for (let i = today.year - 10; i < today.year + 10; i++) years.push(i);
  for (let i = 1; i <= 12; i++) months.push(i);

  const goPrevMonth = () => {
    let newSelectedYear, newSelectedMonth, newDateTotalCount;
    if (selectedMonth === 1) {
      newSelectedMonth = 12;
      newSelectedYear = selectedYear - 1;
    } else {
      newSelectedMonth = selectedMonth - 1;
      newSelectedYear = selectedYear;
    }

    newDateTotalCount = computeDaysInMonth(newSelectedMonth, newSelectedYear);
    const firstDay = new Date(
      new Date(newSelectedYear, newSelectedMonth - 1, 1) -
        new Date().getTimezoneOffset() * 60000
    ).getDay();

    if (newDateTotalCount + firstDay > 35) setCalendarHeight('560px');
    else setCalendarHeight('500px');

    setSelectedMonth(newSelectedMonth);
    setSelectedYear(newSelectedYear);
    setDateTotalCount(newDateTotalCount);

    onPrevBtnClick();
  };
  const goNextMonth = () => {
    let newSelectedYear, newSelectedMonth, newDateTotalCount;
    if (selectedMonth === 12) {
      newSelectedMonth = 1;
      newSelectedYear = selectedYear + 1;
    } else {
      newSelectedMonth = selectedMonth + 1;
      newSelectedYear = selectedYear;
    }

    newDateTotalCount = computeDaysInMonth(newSelectedMonth, newSelectedYear);
    const firstDay = new Date(
      new Date(newSelectedYear, newSelectedMonth - 1, 1) -
        new Date().getTimezoneOffset() * 60000
    ).getDay();

    if (newDateTotalCount + firstDay > 35) setCalendarHeight('560px');
    else setCalendarHeight('500px');

    setSelectedMonth(newSelectedMonth);
    setSelectedYear(newSelectedYear);
    setDateTotalCount(newDateTotalCount);

    onNextBtnClick();
  };

  const displayWeekdays = () => {
    let weekdayLabels = [];
    weekdays.forEach((weekday, index) => {
      weekdayLabels.push(
        <div
          key={weekday}
          className={
            index === 0 ? 'sunday' : index === 6 ? 'saturday' : 'weekday'
          }
        >
          {weekday}
        </div>
      );
    });

    return weekdayLabels;
  };

  const [calendarHeight, setCalendarHeight] = useState('500px');

  const displayDates = useCallback(() => {
    let dates = [];
    const firstDay = new Date(
      new Date(selectedYear, selectedMonth - 1, 1) -
        new Date().getTimezoneOffset() * 60000
    ).getDay();
    for (const weekday of weekdays) {
      if (weekdays[firstDay] === weekday) {
        for (let i = 1; i <= dateTotalCount; i++) {
          const thisDate = new Date(
            new Date(selectedYear, selectedMonth - 1, i) -
              new Date().getTimezoneOffset() * 60000
          );
          const day = thisDate.getDay();
          let achievement = 0,
            achievementLevel = 1;
          let isEmpty = true;
          const thisDateStr = thisDate.toISOString().split('T')[0];

          if (practicedDates.includes(thisDateStr)) {
            isEmpty = false;
            const jsonIdx = practicedDates.indexOf(thisDateStr);

            if (timezone === 'morning') {
              const { totalTimeForeground, wakeUpTime } =
                routineResults[practicedDatesStr[jsonIdx]];
              if (totalTimeForeground <= targets[0]) achievement++;
              if (
                new Date(thisDateStr + 'T' + wakeUpTime).getTime() <=
                new Date(thisDateStr + 'T' + targets[1]).getTime()
              )
                achievement++;
              achievementLevel = achievement / 2;
            } else if (timezone === 'day') {
              const { studyTime, UVExposureTime } =
                routineResults[practicedDatesStr[jsonIdx]];
              if (studyTime >= targets[0]) achievement++;
              if (
                new Date(thisDateStr + 'T' + UVExposureTime).getTime() <=
                new Date(thisDateStr + 'T' + targets[1]).getTime()
              )
                achievement++;
              achievementLevel = achievement / 2;
            } else {
              const { totalStep } = routineResults[practicedDatesStr[jsonIdx]];
              if (totalStep >= targets[0]) achievement++;
              achievementLevel = achievement / 1;
            }
          }
          dates.push(
            <div
              key={i}
              className={
                today.year === selectedYear &&
                today.month === selectedMonth &&
                today.date === i
                  ? 'today'
                  : day === 0
                  ? 'sunday'
                  : day === 6
                  ? 'saturday'
                  : 'weekday'
              }
            >
              <div
                className="outline"
                style={
                  isEmpty
                    ? emptyFilling
                    : achievementLevel === 0
                    ? grayFilling
                    : achievementLevel === 1
                    ? deepFilling
                    : lightFilling
                }
                onMouseEnter={isEmpty ? null : handlePopoverOpen}
                onMouseLeave={isEmpty ? null : handlePopoverClose}
              >
                {i}
              </div>
            </div>
          );
        }
        break;
      } else {
        dates.push(<div key={weekday} className="emptyday"></div>);
      }
    }

    return dates;
  }, [routineResults, selectedYear, selectedMonth, dateTotalCount]);

  return (
    <div className="calendarContainer" style={{ height: calendarHeight }}>
      <div className="pagination">
        <button onClick={goPrevMonth}>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
        </button>
        <div className="monthName">{MonthNames[selectedMonth - 1]}</div>
        <button onClick={goNextMonth}>
          <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </button>
      </div>

      <div className="week">{displayWeekdays()}</div>
      <div className="date">{displayDates()}</div>
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
            width: '500px',
            height: timezone === 'night' ? '120px' : '150px',
            bgcolor: 'background.paper',
          }}
        >
          <div className="tooltipContentsContainer">
            <div className="tooltipTitle">
              How was your {timezoneStr} on <b>{dateStr}</b>
            </div>
            <table className="tooltipTable">
              <tbody>
                <tr>
                  <td className="firstCol"></td>
                  <td className="secondCol">
                    <b>My Goal</b>
                  </td>
                  <td className="thirdCol">
                    <b>Actual Achievement</b>
                  </td>
                </tr>
                <tr>
                  <td className="firstCol">
                    <div
                      className="tooltipIcon"
                      style={{ background: tooltipIcon[0] }}
                    >
                      {' '}
                    </div>
                  </td>
                  <td className="secondCol">
                    {timezone === 'morning'
                      ? `SNS ↓ ${Math.floor(targets[0] / 1000 / 60)} min.`
                      : timezone === 'day'
                      ? `Study ↑ ${Math.floor(targets[0] / 60)} min.`
                      : `Walk ↑ ${targets[0]} steps`}
                  </td>
                  <td className="thirdCol">
                    {timezone === 'morning'
                      ? `Used SNS ${Math.floor(
                          actualAchievements[0] / 1000 / 60
                        )} min.`
                      : timezone === 'day'
                      ? `Studied ${Math.floor(actualAchievements[0] / 60)} min.`
                      : `Walked ${actualAchievements[0]} steps`}
                  </td>
                </tr>
                {timezone === 'night' ? (
                  ''
                ) : (
                  <tr>
                    <td className="firstCol">
                      <div
                        className="tooltipIcon"
                        style={{ background: tooltipIcon[1] }}
                      >
                        {' '}
                      </div>
                    </td>
                    <td className="secondCol">
                      {timezone === 'morning'
                        ? `Wake up at ${targets[1]?.slice(0, 5)}`
                        : timezone === 'day'
                        ? `Enjoy sunshine ↑ 1hr.`
                        : ''}
                    </td>
                    <td className="thirdCol">
                      {timezone === 'morning'
                        ? `Wake up at ${actualAchievements[1]?.slice(0, 5)}`
                        : timezone === 'day'
                        ? new Date(
                            '1970-01-01 ' + actualAchievements[1]
                          ).getTime() <=
                          new Date('1970-01-01 ' + targets[1]).getTime()
                          ? `Enjoyed sunshine ↑ 1hr.`
                          : `Not enough sunshine`
                        : ''}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Box>
      </Popover>
    </div>
  );
}

export default Calendar;

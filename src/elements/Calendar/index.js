import './style.css';
import React, { useState, useEffect, useCallback } from 'react';
import COLORSETS from '../../constants/colorset';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import allUsersRoutine from '../../routineInfos/allUsersRoutine';

function Calendar() {
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

  useEffect(() => {
    morningRoutineResults = morningRoutineResults.filter(
      ({ userID }) => userID === 'USER1'
    );
    const routineRes = {};
    morningRoutineResults.forEach(
      ({ userID, date, totalTimeForeground, wakeUpTime }) => {
        routineRes[date] = { totalTimeForeground, wakeUpTime };
      }
    );

    const dateStr = Object.keys(routineRes);
    const dates = dateStr.map(
      (str) => new Date(str).toISOString().split('T')[0]
    );
    setRoutineResults(routineRes);
    setPracticedDatesStr(dateStr);
    setPracticedDates(dates);
  }, []);

  const targetWakeUpTime = allUsersRoutine['USER1']['morning']['WakeUp'];
  const targetSNSUsage = allUsersRoutine['USER1']['morning']['SNSUsage'];

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
  const [actualWakeUpTime, setActualWakeUpTime] = useState('10:00');
  const [actualSNSUsage, setActualSNSUsage] = useState(0);
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
    const thisDateStr = thisDate.toISOString().split('T')[0];
    if (practicedDates.includes(thisDateStr)) {
      const jsonIdx = practicedDates.indexOf(thisDateStr);
      const { totalTimeForeground, wakeUpTime } =
        routineResults[practicedDatesStr[jsonIdx]];

      setActualWakeUpTime(wakeUpTime);
      setActualSNSUsage(totalTimeForeground);

      if (
        new Date(thisDateStr + 'T' + wakeUpTime).getTime() <=
        new Date(thisDateStr + 'T' + targetWakeUpTime).getTime()
      )
        newTooltipIcon[0] = COLORSETS[timezone][0];
      if (totalTimeForeground <= targetSNSUsage)
        newTooltipIcon[1] = COLORSETS[timezone][0];
    }
    setTooltipIcon(newTooltipIcon);

    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const emptyFilling = {
    width: '50px',
    height: '50px',
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
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
      setDateTotalCount(computeDaysInMonth(12, selectedYear - 1));
    } else {
      setSelectedMonth(selectedMonth - 1);
      setDateTotalCount(computeDaysInMonth(selectedMonth - 1, selectedYear));
    }
  };
  const goNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
      setDateTotalCount(computeDaysInMonth(1, selectedYear + 1));
    } else {
      setSelectedMonth(selectedMonth + 1);
      setDateTotalCount(computeDaysInMonth(selectedMonth + 1, selectedYear));
    }
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

  const displayDates = useCallback(() => {
    let dates = [];

    for (const weekday of weekdays) {
      const firstDay = new Date(
        new Date(selectedYear, selectedMonth - 1, 1) -
          new Date().getTimezoneOffset() * 60000
      ).getDay();
      if (weekdays[firstDay] === weekday) {
        for (let i = 1; i <= dateTotalCount; i++) {
          const thisDate = new Date(
            new Date(selectedYear, selectedMonth - 1, i) -
              new Date().getTimezoneOffset() * 60000
          );
          const day = thisDate.getDay();
          let achievement = 0;
          let isEmpty = true;
          const thisDateStr = thisDate.toISOString().split('T')[0];
          if (practicedDates.includes(thisDateStr)) {
            isEmpty = false;
            const jsonIdx = practicedDates.indexOf(thisDateStr);
            const { totalTimeForeground, wakeUpTime } =
              routineResults[practicedDatesStr[jsonIdx]];
            if (totalTimeForeground <= targetSNSUsage) achievement++;
            if (
              new Date(thisDateStr + 'T' + wakeUpTime).getTime() <=
              new Date(thisDateStr + 'T' + targetWakeUpTime).getTime()
            )
              achievement++;
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
                    : achievement === 0
                    ? grayFilling
                    : achievement === 1
                    ? lightFilling
                    : deepFilling
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
    <div className="calendarContainer">
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
            height: '150px',
            bgcolor: 'background.paper',
          }}
        >
          <div className="tooltipContentsContainer">
            <div className="tooltipTitle">
              How have your {timezoneStr} been on <b>{dateStr}</b>
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
                    Wake up at {targetWakeUpTime.slice(0, 5)}
                  </td>
                  <td className="thirdCol">
                    Wake up at {actualWakeUpTime.slice(0, 5)}
                  </td>
                </tr>
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
                    Less than {Math.floor(targetSNSUsage / 1000 / 60)} min.
                  </td>
                  <td className="thirdCol">
                    Used {Math.floor(actualSNSUsage / 1000 / 60)} min.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Popover>
    </div>
  );
}

export default Calendar;

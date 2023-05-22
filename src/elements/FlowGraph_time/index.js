import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
// import routineResults from '../../routineInfos/routineResults';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';
import nightRoutineResults from '../../routineInfos/nightRoutineResults';

import './style.css';

const URLSplit = window.document.URL.split('/');
var timezone = 'morning';
var routine = 'WakeUp';

if (URLSplit.length >= 6) {
  timezone = URLSplit[URLSplit.length - 2];
  routine = URLSplit[URLSplit.length - 1];
}

const routinesets = {
  WakeUp: 'wakeUpTime',
  SNSUsage: 'totalTimeForeground',
  UVExposure: 'UVExposureTime',
  study: 'studyTime',
  step: 'totalStep'
}
const routinename = routinesets[routine];

const colorsets = {
  morning: ['rgba(255, 202, 45, 0.7)'],
  day: ['rgba(140, 215, 53, 0.7)'],
  night: ['rgba(63, 81, 181, 0.7)'],
};

let FilteredroutineResultsMy;
let FilteredroutineResultsOthers;

if (timezone === 'morning') {
  FilteredroutineResultsMy = morningRoutineResults.filter(({ userID }) => userID === 'USER1');
  FilteredroutineResultsOthers = morningRoutineResults.filter(({ userID }) => userID === 'USER2' || userID === 'USER3' || userID === 'USER4');
} else if (timezone === 'day'){
  FilteredroutineResultsMy = dayRoutineResults.filter(({ userID }) => userID === 'USER1');
  FilteredroutineResultsOthers = dayRoutineResults.filter(({ userID }) => userID === 'USER2' || userID === 'USER3' || userID === 'USER4');
}
else {
  FilteredroutineResultsMy = nightRoutineResults.filter(({ userID }) => userID === 'USER1');
  FilteredroutineResultsOthers = nightRoutineResults.filter(({ userID }) => userID === 'USER2' || userID === 'USER3' || userID === 'USER4');
}

const routineResultsMy = {};
const routineResultsOthers = {};

FilteredroutineResultsMy.forEach((obj) => {
  const { date, ...data } = obj;
  routineResultsMy[date] = data;
});

FilteredroutineResultsOthers.forEach((obj) => {
  const { date, ...data } = obj;
  routineResultsOthers[date] = data;
});

const practicedDatesMyStr = Object.keys(routineResultsMy);
const practicedDatesOthersStr = Object.keys(routineResultsOthers);

const practicedDatesMy = practicedDatesMyStr.map((str) => new Date(str).toISOString().split('T')[0]);
const practicedDatesOthers = practicedDatesOthersStr.map((str) => new Date(str).toISOString().split('T')[0]);

function getYearAndWeek(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  const paddedWeekNumber = weekNumber.toString().padStart(2, '0'); // Pad week number with leading zeros
  return [year, paddedWeekNumber];
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysSinceFirstDay = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((1 + daysSinceFirstDay) / 7);
  return weekNumber;
}

function FlowGraph_time() {
  const [toggleActive, setToggleActive] = useState(false);

  useEffect(() => {
    const toggle = document.querySelector('.toggle-button');

    const handleClick = () => {
      setToggleActive(!toggleActive);
    };

    toggle.addEventListener('click', handleClick);

    return () => {
      toggle.removeEventListener('click', handleClick);
    };
  }, [toggleActive]);

  const practicedWeeks = practicedDatesMy.reduce((weeks, date) => {
    const [year, week] = getYearAndWeek(date);
    const yearWeek = `${week}`;

    if (!weeks.some((w) => w === yearWeek)) {
      weeks.push(yearWeek);
    }

    return weeks;
  }, []);

  const aggregatedWakeUpTimesMy = practicedWeeks.map((week) => {
    const weekNumber = week;
    const weekDates = practicedDatesMy.filter((date) => {
      const [dateYear, dateWeek] = getYearAndWeek(date);
      return dateWeek == weekNumber;
    });

    const weekWakeUpTimes = weekDates.map((date) => {
      const timeStr = routineResultsMy[date][routinename];
      // const timeStr = routineResultsMy[date].wakeUpTime;
      // console.log(timeStr);
      var [hours, minutes, seconds] = [0, 0, 0];
      if ((routinename=='wakeUpTime') || (routinename=='UVExposureTime')) {
        [hours, minutes, seconds] = timeStr.split(':');
      }
      // const [hours, minutes, seconds] = timeStr.split(':');
      return new Date(2019, 0, 1, hours, minutes, seconds);
    });

    const filteredWakeUpTimes = weekWakeUpTimes.filter((time) => {
      var targetTimeHours = 9; // Target wake up time: 9:00 am
      if (timezone == 'day') targetTimeHours = 18;
      const targetTimeMinutes = 0;
      const targetTimeSeconds = 0;

      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      if (
        hours < targetTimeHours ||
        (hours === targetTimeHours && minutes < targetTimeMinutes) ||
        (hours === targetTimeHours && minutes === targetTimeMinutes && seconds < targetTimeSeconds)
      ) {
        return true; // Wake up time is before 9:00 am
      }

      return false; // Wake up time is after or at 9:00 am
    });

    return filteredWakeUpTimes.length; // Return the count of wake up times
    });

    const aggregatedWakeUpTimesOthers = practicedWeeks.map((week) => {
      const weekNumber = week;
      const weekDates = practicedDatesOthers.filter((date) => {
        const [dateYear, dateWeek] = getYearAndWeek(date);
        return dateWeek == weekNumber;
      });
  
      const weekWakeUpTimes = weekDates.map((date) => {
        const timeStr = routineResultsOthers[date][routinename];
        // const timeStr = routineResultsOthers[date].wakeUpTime;
        var [hours, minutes, seconds] = [0, 0, 0];
        if ((routinename=='wakeUpTime') || (routinename=='UVExposureTime')) {
          [hours, minutes, seconds] = timeStr.split(':');
        }
        // const [hours, minutes, seconds] = timeStr.split(':');
        return new Date(2019, 0, 1, hours, minutes, seconds);
      });
  
    const filteredWakeUpTimes = weekWakeUpTimes.filter((time) => {
      var targetTimeHoursOthers = 9; // Target wake up time: 9:00 am
      if (timezone == 'day') targetTimeHoursOthers = 18;
        const targetTimeMinutes = 0;
        const targetTimeSeconds = 0;
  
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
  
        if (
          hours < targetTimeHoursOthers ||
          (hours === targetTimeHoursOthers && minutes < targetTimeMinutes) ||
          (hours === targetTimeHoursOthers && minutes === targetTimeMinutes && seconds < targetTimeSeconds)
        ) {
          return true; // Wake up time is before 9:00 am
        }
  
        return false; // Wake up time is after or at 9:00 am
      });
  
      return filteredWakeUpTimes.length; // Return the count of wake up times
    });

  const myplot = {
    x: practicedWeeks,
    y: aggregatedWakeUpTimesMy,
    fill: 'tozeroy',
    fillcolor: colorsets[timezone][0],
    type: 'scatter',
    mode: 'none',
    name: 'Me',
    line: { shape: 'spline' },
  };
  
  const othersplot = {
    x: practicedWeeks,
    y: aggregatedWakeUpTimesOthers,
    fill: 'tozeroy',
    // fillcolor: '#cccccc',
    fillcolor: 'rgba(204, 204, 204, 0.6)',
    opacity: 80,
    type: 'scatter',
    mode: 'none',
    name: 'Others',
    line: { shape: 'spline' },
  };

  const layout = {
    showlegend: false,
    font: {
      size: 12,
    },
    xaxis: {
      type: 'category',
      title: {
        text: 'Date',
      },
      rangeslider: {},
    },
    yaxis: {
      title: {
        text: '# of Days',
        font: {
          size: 16,
        },
      },
    },
  };

  const data = toggleActive ? [othersplot, myplot] : [myplot];
  
  return (
    <div>
      <div className="title">
        <b>ACHIEVEMENT LEVEL</b> flow
        <div className="subtitle">Move the slider to check your trend by period</div>
      </div>
  
      <div className="dateinfo">
        <b>2019/01/25 - 2019/05/14</b>
      </div>
  
      <div className="toggle-container">
        <div className={`toggle-button ${toggleActive ? 'active' : ''}`}>
          <div className="inner-circle"></div>
        </div>
        <div className="toggle-text">View Others</div>
      </div>
  
      <Plot className="graphContainer" data={data} layout={layout} />
  
      <div className="comment">* Aggregated by week</div>
    </div>
  );
}

export default FlowGraph_time;

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
// import routineResults from '../../routineInfos/routineResults';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';
import nightRoutineResults from '../../routineInfos/nightRoutineResults';
import { Icon } from '@iconify/react';

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


function FlowGraph() {
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
      // const timeStr = routineResultsMy[date].WakeUpTime;
      return timeStr;
    });

    const filteredWakeUpTimes = weekWakeUpTimes.filter((time) => {
      var targetTimeHours = 2700000;
      if (timezone == 'morning') {
        if (time < targetTimeHours) {
          return true;
        }
        return false;
      }
      else if (timezone == 'day') {
        targetTimeHours = 3600;
        if (time >= targetTimeHours) {
          return true;
        }
        return false;
      }
      else {
        targetTimeHours = 3000;
        if (time >= targetTimeHours) {
          return true;
        }
        return false;   
      }
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
      // const timeStr = routineResultsMy[date].WakeUpTime;
      return timeStr;
    });
  
    const filteredWakeUpTimes = weekWakeUpTimes.filter((time) => {
      var targetTimeHours = 2700000;
      if (timezone == 'morning') {
        if (time < targetTimeHours) {
          return true;
        }
        return false;
      }
      else if (timezone == 'day') {
        targetTimeHours = 3600;
        if (time >= targetTimeHours) {
          return true;
        }
        return false;
      }
      else {
        targetTimeHours = 3000;
        if (time >= targetTimeHours) {
          return true;
        }
        return false;
      }
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
      tickmode: 'array', // Set the tick mode to "array"
      ticktext: ['Feb', 'Mar', 'Apr', 'May'], // Custom tick labels
      tickvals: [1, 5, 9, 17], // Corresponding tick values
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
        <div class="tooltip">
          <div className="toggle-question">
            <Icon
              icon="fe:question"
              color="#666666"
              className="userIcon"
            />
          </div>
          <div class="tooltip-content">
            <p>Who are <b>others</b>? <br></br>
              : They are people who have <b>the same routine</b> with you. <br></br>
              We give you the <b>average achievement</b> of them.</p>
          </div>
        </div>
      </div>
  
      <Plot className="graphContainer" data={data} layout={layout} />
  
      <div className="comment">* Aggregated by week</div>
    </div>
  );
}

export default FlowGraph;

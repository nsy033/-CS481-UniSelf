import './style.css';
import React from 'react';
import Plot from 'react-plotly.js';
import routineResults from '../../routineInfos/routineResults';

const URLSplit = window.document.URL.split('/');
var timezone = 'morning';

if (URLSplit.length >= 6) {
  timezone = URLSplit[URLSplit.length - 2];
}
const colorsets = {
  morning: ['#FFCA2D', '#FFE9A9'],
  day: ['#8CD735', '#D8EDC0'],
  night: ['#3F51B5', '#CED3F0'],
};

const practicedDatesStr = Object.keys(routineResults);
const practicedDates = practicedDatesStr.map(
  (str) => new Date(str).toISOString().split('T')[0]
);

// Get the unique year and week combination from the practicedDates
const practicedWeeks = practicedDates.reduce((weeks, date) => {
  const [year, week] = getYearAndWeek(date);
  // const yearWeek = `${year}-${week}`;
  const yearWeek = `${week}`;

  if (!weeks.some((w) => w === yearWeek)) {
    weeks.push(yearWeek);
  }

  return weeks;
}, []);

// console.log('practicedWeeks:', practicedWeeks);

// Filter and aggregate the wake up times for each week
const aggregatedWakeUpTimes = practicedWeeks.map((week) => {
  // const [year, weekNumber] = week.split('-');
  const weekNumber = week;
  const weekDates = practicedDates.filter((date) => {
    const [dateYear, dateWeek] = getYearAndWeek(date);
    // return dateYear == year && dateWeek == weekNumber;
    return dateWeek == weekNumber;
  });

  const weekWakeUpTimes = weekDates.map((date) => {
    const timeStr = routineResults[date].wakeUpTime;
    const [hours, minutes, seconds] = timeStr.split(':');
    return new Date(2019, 0, 1, hours, minutes, seconds);
  });

  // console.log('Week wake up times length:', weekWakeUpTimes.length);

  const filteredWakeUpTimes = weekWakeUpTimes.filter((time) => {
    const targetTimeHours = 9; // Target wake up time: 9:00 am
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

// console.log('aggregatedWakeUpTimes:', aggregatedWakeUpTimes);

// Get the year and week number from a date string
// function getYearAndWeek(dateStr) {
//   const date = new Date(dateStr);
//   const year = date.getFullYear();
//   const weekNumber = getWeekNumber(date);
//   return [year, weekNumber];
// }

function getYearAndWeek(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  const paddedWeekNumber = weekNumber.toString(); // Pad week number with leading zeros
  return [year, paddedWeekNumber];
}

// Get the week number from a date
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysSinceFirstDay = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
  // const weekNumber = Math.ceil((date.getDay() + 1 + daysSinceFirstDay) / 7);
  const weekNumber = Math.ceil((1 + daysSinceFirstDay) / 7);
  return weekNumber;
}

var data = {
  x: practicedWeeks,
  y: aggregatedWakeUpTimes,
  fill: 'tozeroy',
  fillcolor: colorsets[timezone][0],
  type: 'scatter',
  mode: 'none',
  name: 'Wake Up Time',
  line: { shape: 'spline' }
};

var layout = {
  font: {
    size: 12
  },
  xaxis: {
    type: 'category',
    title: {
      text: 'Date'
    },
    rangeslider: {}
  },
  yaxis: {
    // tickformat: '%H:%M:%S',
    title: {
      text: '# of Days',
      font: {
        size: 16,
      }
    }
  }
}

  function FlowGraph () {
    let flowgraph = [];
    flowgraph.push(
      <div className="title">
        <b>ACHIEVEMENT LEVEL</b> flow
      <div className="subtitle">
        Move the slider to check your trend by period
      </div>
      </div>
    );

    flowgraph.push(
      <div className="dateinfo">
        <b>19/01/25 - 19/05/14</b>
      </div>
    );

    flowgraph.push(
      <Plot
      className="graphContainer"
      data={[data]}
      layout={layout}
      />
    );

    flowgraph.push(
      <div className="comment">
        * Aggregated by week
      </div>
    )
    return (flowgraph);
  }

  export default FlowGraph;
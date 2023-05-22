import React from 'react';
import Plot from 'react-plotly.js';
// import routineResults from '../../routineInfos/routineResults';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';

const URLSplit = window.document.URL.split('/');
var timezone = 'morning';
var routine = 'WakeUp';
if (URLSplit.length >= 6) {
  timezone = URLSplit[URLSplit.length - 2];
  routine = URLSplit[URLSplit.length - 1];
}

const routinesets = {
  WakeUp: ['wakeUpTime', 'Daily wake up time'],
  SNSUsage: ['totalTimeForeground', 'Daily SNS usage time'],
  UVExposure: ['UVExposureTime', 'Daily UV exposure time'],
  study: ['studyTime', 'Daily study time'],
}
const routinename = routinesets[routine][0];

const colorsets = {
  morning: ['#FFCA2D', '#FFE9A9'],
  day: ['#8CD735', '#D8EDC0'],
  night: ['#3F51B5', '#CED3F0'],
};

let FilteredroutineResults;

if (timezone === 'morning') {
  FilteredroutineResults = morningRoutineResults.filter(({ userID }) => userID === 'USER1');
} else if (timezone === 'day'){
    FilteredroutineResults = dayRoutineResults.filter(({ userID }) => userID === 'USER1');
} else {
    FilteredroutineResults = morningRoutineResults.filter(({ userID }) => userID === 'USER1');
}

const routineResults = {};

FilteredroutineResults.forEach((obj) => {
  const { date, ...data } = obj;
  routineResults[date] = data;
});

const practicedDatesStr = Object.keys(routineResults);
const practicedDates = practicedDatesStr.map(
  (str) => new Date(str).toISOString().split('T')[0]
);

const wakeUpTimes = practicedDatesStr.map((str) => {
  const timeStr = routineResults[str][routinename];
  // const timeStr = routineResults[str].wakeUpTime;
  // console.log(timeStr);
  const [hours, minutes, seconds] = timeStr.split(':');
  return new Date(2019, 0, 1, hours, minutes, seconds);
});

const markerColors = wakeUpTimes.map((time) => {
  var wakeUpTime = new Date(time);
  var targetTime = new Date(2019, 0, 1, 9, 0, 0); // Target wake up time at 09:00

  // if (wakeUpTime < targetTime) {
  //   return colorsets[timezone][0]; // Use colorsets[timezone][0] if wakeUpTime is earlier than 08:30
  // } else {
  //   return "FFFFFF"; // Use FFFFFF if wakeUpTime is 08:30 or later
  // }

  if (timezone == 'morning') {
    if (wakeUpTime < targetTime) {
      return colorsets[timezone][0]; // Use colorsets[timezone][0] if wakeUpTime is earlier than 08:30
    } else {
      return "FFFFFF"; // Use FFFFFF if wakeUpTime is 08:30 or later
    }
  }
  else if (timezone == 'day') {
    targetTime = new Date(2019, 0, 1, 18, 0, 0);
    if (wakeUpTime < targetTime) {
      return colorsets[timezone][0]; // Use colorsets[timezone][0] if wakeUpTime is earlier than 08:30
    } else {
      return "FFFFFF"; // Use FFFFFF if wakeUpTime is 08:30 or later
    }
  }
});

const markerlineColors = wakeUpTimes.map((time) => {
  const wakeUpTime = new Date(time);

  if (timezone == 'morning') {
    return colorsets[timezone][0];
  }
  else if (timezone == 'day') {
    const zeroTime = new Date(2019, 0, 1, 23, 59, 59);
    if (wakeUpTime.getTime() === zeroTime.getTime()) {
      return 'rgba(255, 255, 255, 0.0)';
    }
    return colorsets[timezone][0];
  }
});

const mode = routine=='morning' ? "markers+lines" : "markers";

var scatterplot = {
    type: "scatter",
    x: practicedDates,
    y: wakeUpTimes,
    mode: mode,
    line: {
      color: colorsets[timezone][0], 
      width: 2
    },
    marker: {
      size: 8,
      color: markerColors,
      line: {
        color: markerlineColors,
        width: 2
      }
    },
    name: 'My Data',
}

// var background = {
// x: practicedDates,
// y: Array.from({ length: 110 }, () => "09:00:00").map(time => '2019-01-01 ' + time),
// fill: 'tozeroy',
// fillcolor: colorsets[timezone][1],
// type: 'scatter',
// mode: 'none',
// name: 'Goal'
// }

var y;
if (timezone === 'morning') {
  y = Array.from({ length: 110 }, () => "09:00:00").map(time => '2019-01-01 ' + time);
} else if (timezone === 'day') {
  y = Array.from({ length: 110 }, () => "18:00:00").map(time => '2019-01-01 ' + time);
}

var background = {
  x: practicedDates,
  y: y,
  fill: 'tozeroy',
  fillcolor: colorsets[timezone][1],
  type: 'scatter',
  mode: 'none',
  name: 'Goal'
}

// var whitebackground = {
//   x: practicedDates,
//   y: Array.from({ length: 110 }, () => "12:00:00").map(time => '2019-01-01 ' + time),
//   fill: 'tozeroy',
//   fillcolor: 'ffffff',
//   type: 'scatter',
//   mode: 'none',
//   name: 'Goal'
// }

const initial_range = [
'2019-04-14', '2019-05-15'
]
    
var layout = {
showlegend: false,
font: {
    size: 12
},
xaxis: {
        //   rangeSelector: {buttons: [{
        //     step: 'all'
        // }]},
        rangeslider: {},
        range: initial_range
    },
// xaxis: {
//   tickformat: '%H:%M:%S',
// },
yaxis: {
    // tickformat: '%H:%M:%S',
    title: {
    text: 'Time',
    font: {
        size: 16,
    }
    }
}
}

const data = routine=='morning' ? [background, scatterplot] : [background, scatterplot];

function DetailGraph() {
let detailgraph = [];
detailgraph.push(
    <div className="title">
    {routinesets[routine][1]} <b>DETAILS</b>
    </div>
);

detailgraph.push(
    <Plot
    className="graphContainer"
    data={data}
    layout={layout}
/>
)
return (detailgraph);
}

export default DetailGraph;
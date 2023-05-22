import React from 'react';
import Plot from 'react-plotly.js';
// import routineResults from '../../routineInfos/routineResults';
import morningRoutineResults from '../../routineInfos/morningRoutineResults';
import dayRoutineResults from '../../routineInfos/dayRoutineResults';
import nightRoutineResults from '../../routineInfos/nightRoutineResults';

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
  step: ['totalStep', 'Daily Exercise time']
};
// console.log(routinesets[WakeUp]);

const routinename = routinesets[routine][0];
// const routinename = 'totalTimeForeground';

const colorsets = {
  morning: ['#FFCA2D', '#FFE9A9'],
  day: ['#8CD735', '#D8EDC0'],
  night: ['#3F51B5', '#CED3F0'],
};

let FilteredroutineResults;

if (timezone === 'morning') {
  FilteredroutineResults = morningRoutineResults.filter(
    ({ userID }) => userID === 'USER1'
  );
} else if (timezone === 'day') {
  FilteredroutineResults = dayRoutineResults.filter(
    ({ userID }) => userID === 'USER1'
  );
} else {
  FilteredroutineResults = nightRoutineResults.filter(
    ({ userID }) => userID === 'USER1'
  );
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
  // const timeStr = routineResults[str].totalTimeForeground;
  return timeStr;
});

const markerColors = wakeUpTimes.map((time) => {
  var targetTime = 2700000;
  if (timezone == 'morning') {
    if (time < targetTime) {
      return colorsets[timezone][0];
    }
    return 'FFFFFF';
  } else if (timezone == 'day') {
    targetTime = 3600;
    if (time >= targetTime) {
      return colorsets[timezone][0];
    }
    return 'FFFFFF';
  } else  {
    targetTime = 3000;
    if (time >= targetTime) {
      return colorsets[timezone][0];
    }
    return 'FFFFFF';
  }
});

var scatterplot = {
  type: 'scatter',
  x: practicedDates,
  y: wakeUpTimes,
  mode: 'markers+lines',
  line: {
    color: colorsets[timezone][0],
    width: 2,
  },
  marker: {
    size: 8,
    color: markerColors,
    line: {
      color: colorsets[timezone][0],
      width: 2,
    },
  },
  name: 'My Data',
};

var y;
if (timezone === 'morning') {
  y = Array.from({ length: 110 }, () => 2700000);
} else if (timezone === 'day') {
  y = Array.from({ length: 110 }, () => 20000);
} else {
  y = Array.from({ length: 110 }, () => 10000);
}

var background = {
  x: practicedDates,
  y: y,
  fill: 'tozeroy',
  fillcolor: colorsets[timezone][1],
  type: 'scatter',
  mode: 'none',
  name: 'Goal',
};

var y_white;
if (timezone === 'day') {
  y_white = Array.from({ length: 110 }, () => 3600);
}
else {
  y_white = Array.from({ length: 110 }, () => 3000);
}

var whitebackground = {
  x: practicedDates,
  y: y_white,
  fill: 'tozeroy',
  fillcolor: 'ffffff',
  type: 'scatter',
  mode: 'none',
  name: 'Goal',
};

const initial_range = ['2019-04-14', '2019-05-15'];

var layout = {
  showlegend: false,
  font: {
    size: 12,
  },
  xaxis: {
    //   rangeSelector: {buttons: [{
    //     step: 'all'
    // }]},
    rangeslider: {},
    range: initial_range,
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
      },
    },
  },
};

const data =
  routine == 'morning'
    ? [background, scatterplot]
    : [background, whitebackground, scatterplot];

function DetailGraph() {
  let detailgraph = [];
  detailgraph.push(
    <div className="title">
      {routinesets[routine][1]} <b>DETAILS</b>
    </div>
  );

  detailgraph.push(
    <Plot className="graphContainer" data={data} layout={layout} />
  );
  return detailgraph;
}

export default DetailGraph;

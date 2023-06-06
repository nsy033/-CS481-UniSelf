import React from 'react';
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
  WakeUp: ['wakeUpTime', 'Daily wake up time'],
  SNSUsage: ['totalTimeForeground', 'Daily SNS usage time'],
  UVExposure: ['UVExposureTime', 'Daily UV exposure time'],
  study: ['studyTime', 'Daily study time'],
  step: ['totalStep', 'Daily Step Count'],
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
} else if (timezone === 'night') {
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

// function formatTime(timeStr) {
//   const seconds = parseInt(timeStr, 10);
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;
//   return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
// }

const wakeUpTimes = practicedDatesStr.map((str) => {
  let timeStr = routineResults[str][routinename];
  // const timeStr = routineResults[str].totalTimeForeground;
  return timeStr;
});

// const wakeUpTimes = practicedDatesStr.map((str) => {
//   const seconds = routineResults[str][routinename];
//   const formattedTime = formatTime(seconds);
//   return formattedTime;
// });

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
  } else if (timezone == 'night') {
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
} else if (timezone === 'night') {
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
} else if (timezone === 'night') {
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

var y_adj;
if (timezone == 'morning') {
  y_adj = Array.from({ length: 14 }, (_, i) => {
    const t = i / (14 - 1); // Normalized value between 0 and 1
    return 2700000 + (3600000 - 2700000) * (1 - t);
  });
}

var adjustmentbackground = {
  x: practicedDates,
  y: y_adj,
  fill: 'tozeroy',
  fillcolor: colorsets[timezone][1],
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
    title: {
      text: 'Step Count',
      font: {
        size: 16,
      },
    },
    ...(timezone === 'day' && {
      title: {
        text: 'Study Time',
        font: {
          size: 16,
        },
      },
      tickformat: '%H:%M:%S',
      tickvals: ['0', '3600', '7200', '10800', '14400', '18000'],
      ticktext: [
        '0:00:00',
        '1:00:00',
        '2:00:00',
        '3:00:00',
        '4:00:00',
        '5:00:00',
      ],
    }),
    ...(timezone === 'morning' && {
      title: {
        text: 'SNS Time',
        font: {
          size: 16,
        },
      },
      tickformat: '%H:%M:%S',
      tickvals: ['0', '3600000', '7200000', '10800000', '14400000', '18000000'],
      ticktext: [
        '0:00:00',
        '1:00:00',
        '2:00:00',
        '3:00:00',
        '4:00:00',
        '5:00:00',
      ],
    }),
  },
  margin: {
    t: 30,
  },
};

const data =
  timezone == 'morning'
    ? [background, adjustmentbackground, scatterplot]
    : [background, whitebackground, scatterplot];

function DetailGraph() {
  let detailgraph = [];
  detailgraph.push(
    <div>
      <div className="title">
        {routinesets[routine][1]} <b>DETAILS</b>
        <div className="big-subtitle">
          This <b>detail graph</b> shows your routine achievement{' '}
          <b>in specific figures</b> on a <b>daily</b> basis.
        </div>
        <div className="sub-subtitle">
          Move the slider to check your achievement by period.
        </div>
      </div>
      <div className="legend-container">
        <div
          className="goal-color"
          style={{ backgroundColor: colorsets[timezone][1] }}
        ></div>
        <div className="legend-text">Goal</div>
      </div>
    </div>
  );

  detailgraph.push(
    <Plot className="graphContainer" data={data} layout={layout} />
  );
  return detailgraph;
}

export default DetailGraph;

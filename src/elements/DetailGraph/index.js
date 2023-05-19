// import React from 'react';
// import Plot from 'react-plotly.js';
// import csvtojson from 'csvtojson';

// class DetailGraph extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       wakeUpTimes: []
//     }
//   }

//   componentDidMount() {
//     // Load the CSV data and parse it into an array of objects
//     csvtojson()
//       .fromFile('wakeUpTimes.csv')
//       .then(data => {
//         this.setState({ wakeUpTimes: data });
//       });
//   }

//   render() {
//     // Map over the wakeUpTimes array to create the x and y arrays
//     const x = this.state.wakeUpTimes.map(entry => entry.date);
//     const y = this.state.wakeUpTimes.map(entry => entry.wakeUpTime);

//     // Create the plot data and layout
//     const data = {
//       type: "scatter",
//       x: x,
//       y: y
//     };
//     const layout = {
//       title: "Routine detail Graph",
//       font: {
//         size: 10
//       }
//     };

//     return (
//       <Plot
//         data={[data]}
//         layout={layout}
//       />
//     );
//   }
// }

// export default DetailGraph;

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

const wakeUpTimes = practicedDatesStr.map((str) => {
  const timeStr = routineResults[str].wakeUpTime;
  const [hours, minutes, seconds] = timeStr.split(':');
  return new Date(2019, 0, 1, hours, minutes, seconds);
});

const markerColors = wakeUpTimes.map((time) => {
  const wakeUpTime = new Date(time);
  const targetTime = new Date(2019, 0, 1, 9, 0, 0); // Target wake up time at 09:00

  if (wakeUpTime < targetTime) {
    return colorsets[timezone][0]; // Use colorsets[timezone][0] if wakeUpTime is earlier than 08:30
  } else {
    return "FFFFFF"; // Use FFFFFF if wakeUpTime is 08:30 or later
  }
});

var scatterplot = {
    type: "scatter",
    x: practicedDates,
    y: wakeUpTimes,
    mode: "markers+lines",
    line: {
      color: colorsets[timezone][0], 
      width: 2
    },
    marker: {
      size: 8,
      color: markerColors,
      line: {
        color: colorsets[timezone][0],
        width: 2
      }
    },
    name: 'wake up time',
  }

  var background = {
    x: practicedDates,
    y: Array.from({ length: 110 }, () => "09:00:00").map(time => '2019-01-01 ' + time),
    fill: 'tozeroy',
    fillcolor: colorsets[timezone][1],
    type: 'scatter',
    mode: 'none',
    name: 'Goal'
  }
    
  var layout = {
    font: {
      size: 12
    },
    // xaxis: {
    //         rangeSelector: {buttons: [{
    //           step: 'all'
    //       }]},
    //         rangeslider: {}
    //     },
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
  
  function DetailGraph() {
    let detailgraph = [];
    detailgraph.push(
      <div className="title">
        Daily wake up time <b>DETAILS</b>
      </div>
    );

    detailgraph.push(
      <Plot
        className="graphContainer"
        data={[background, scatterplot]}
        layout={layout}
    />
    )
    return (detailgraph);
  }

  export default DetailGraph;
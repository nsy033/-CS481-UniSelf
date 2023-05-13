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

const URLSplit = window.document.URL.split('/');
const timezone = 'morning';
if (URLSplit.length >= 2) {
  const timezone = URLSplit[URLSplit.length - 2];
}
const colorsets = {
  morning: ['#FFCA2D', '#FFE9A9'],
  day: ['#8CD735', '#D8EDC0'],
  night: ['#3F51B5', '#CED3F0'],
};

var scatterplot = {
    type: "scatter",
    // x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    x: ["2019-05-08", "2019-05-09", "2019-05-10", "2019-05-11", "2019-05-12", "2019-05-13", "2019-05-14"],
    // y: [952, 910, 870, 860, 842, 822, 800, 842, 868, 883, 812, 934, 885, 864, 845, 855, 910, 810, 890, 888, 982, 976, 1082, 1022, 1028, 920, 906, 850, 876, 922],
    // y: ["08:17:22","08:18:14","08:18:00","08:09:00","08:32:00","08:16:20","08:14:29","08:14:31","08:32:00","08:39:00","08:29:00","08:27:00","08:28:00","08:24:00","08:19:00","08:32:00","08:32:00","08:39:00","08:29:00","08:27:00","08:28:00","08:24:00","08:25:00","08:26:45","08:19:20","08:26:00","08:28:00","08:20:00","08:17:22","08:31:00"].map(time => '2023-01-01 ' + time),
    y: ["08:17:22","08:18:14","08:18:00","08:09:00","08:32:00","08:16:20","08:14:29"].map(time => '2019-01-01 ' + time),
    mode: "markers+lines",
    line: {
      color: colorsets[timezone][0], 
      width: 2
    },
    marker: {
      size: 8,
      // color: [colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], "FFFFFF", colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], "FFFFFF", "FFFFFF", colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], "FFFFFF", "FFFFFF", "FFFFFF", colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], "FFFFFF"],
      color: [colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], colorsets[timezone][0], "FFFFFF", colorsets[timezone][0], colorsets[timezone][0]],
      line: {
        color: colorsets[timezone][0],
        width: 2
      }
    },
    name: 'wake up time',
  }

  var background = {
    // x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    x: ["2019-05-08", "2019-05-09", "2019-05-10", "2019-05-11", "2019-05-12", "2019-05-13", "2019-05-14"],
    // y: [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900],
    // y: ["08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00"].map(time => '2023-01-01 ' + time),
    y: ["08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00","08:30:00"].map(time => '2019-01-01 ' + time),
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
    xaxis: {
      tickformat: '%H:%M:%S',
    },
    yaxis: {
      tickformat: '%H:%M:%S',
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
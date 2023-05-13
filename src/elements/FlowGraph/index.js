import React from 'react';
import Plot from 'react-plotly.js';
import './style.css';

const URLSplit = window.document.URL.split('/');
const timezone = URLSplit[URLSplit.length - 2];
const colorsets = {
  morning: ['#FFCA2D', '#FFE9A9'],
  day: ['#8CD735', '#D8EDC0'],
  night: ['#3F51B5', '#CED3F0'],
};

var data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    y: [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 2, 2, 2, 3, 3, 4],
    fill: 'tozeroy',
    fillcolor: colorsets[timezone][0],
    type: 'scatter',
    mode: 'none',
    name: 'Trace 2',
    line: {shape: 'spline'}
}

var layout = {
  font: {
    size: 12
  },
  // xaxis: {
  //   title: {
  //     text: 'xaxis'
  //   }
  // },
  yaxis: {
    title: {
      text: '# of Days',
      font: {
        size: 16,
      }
    }
  }
  // yaxis: {
  //   tickformat: '%H:%M:%S'
  // }
}
  
  // class FlowGraph extends React.Component {
  //   render() {
  //     return (
  //       <Plot
  //         data={[data]}
  //         layout={[layout]}
  //       />
  //     );
  //   }
  // }

  function FlowGraph () {
    let flowgraph = [];
    flowgraph.push(
      <div className="title">
        <b>ACHIEVEMENT LEVEL</b> flow
      </div>
    );

    flowgraph.push(
      <div className="dateinfo">
        <b>23/01/02 - 23/04/28</b>
      </div>
    )

    flowgraph.push(
      <div className="subtitle">
        Move the slider to check your trend by period
      </div>
    );

    flowgraph.push(
      <Plot
      className="graphContainer"
      data={[data]}
      layout={layout}
      />
    );
    return (flowgraph);
  }

  export default FlowGraph;


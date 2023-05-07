import React from 'react';
import Plot from 'react-plotly.js';

var data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    y: [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 2, 2, 2, 3, 3, 4],
    fill: 'tozeroy',
    fillcolor: 'FFCA2D',
    type: 'scatter',
    mode: 'none',
    name: 'Trace 2',
    line: {shape: 'spline'}
  }
  
  var layout = {
    title: "Flow Graph",
    font: {
      size: 10
    },
    // yaxis: {
    //   tickformat: '%H:%M:%S'
    // }
  }
  
  class FlowGraph extends React.Component {
    render() {
      return (
        <Plot
          data={[data]}
          layout={[layout]}
        />
      );
    }
  }

  export default FlowGraph;
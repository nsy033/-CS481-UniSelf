import './style.css';
import React from 'react';
import Plot from 'react-plotly.js';
import COLORSETS from '../../constants/colorset.js';

function Sankey() {
    function addAlpha(color, opacity) {
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }

    const opacity = 0.75

    const morning = addAlpha(COLORSETS["morning"][0], opacity)
    const day = addAlpha(COLORSETS["day"][0], opacity)
    const night = addAlpha(COLORSETS["night"][0], opacity)
    const transparent = addAlpha("#FFFFFF", 0)

    // const arr1 = ["Wake up at 9AM", "Write Diary", "Use less SNS", "Exercise more than 1 hr.", "Check mail box"]
    const rank1 = [1, 2, 3, 4, 5]
    const rank2 = [2, 1, 5, 4, 3]
    const rank3 = [4, 1, 3, 5, 2]
    const x_locus = [0, 0.5, 1]

    const n = 100
    var data = {
        type: "sankey",
        domain: {
            x: [0,1],
            y: [0,1]
          },
        node: {
          pad: 50,
          thickness: 10,
          line: {
            width: 0
          },
        //  label: arr1,
         x: [x_locus[0], x_locus[0], x_locus[0], x_locus[0], x_locus[0],
            x_locus[1], x_locus[1], x_locus[1], x_locus[1], x_locus[1],
            x_locus[2], x_locus[2], x_locus[2], x_locus[2], x_locus[2]],
         y: [0.2*rank1[0], 0.2*rank1[1], 0.2*rank1[2], 0.2*rank1[3], 0.2*rank2[4],
            0.2*rank2[0], 0.2*rank2[1], 0.2*rank2[2], 0.2*rank2[3], 0.2*rank2[4],
            0.2*rank3[0], 0.2*rank3[1], 0.2*rank3[2], 0.2*rank3[3], 0.2*rank3[4]],
         color: [morning, night, day, night, morning, 
            morning, night, day, night, morning, 
            morning, night, day, night, morning]
            },
      
        link: {
          color: [morning, night, day, night, morning,
                morning, night, day, night, morning],
          source: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          target: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          value:  [10*n, 8*n, 6*n, 4*n, 2*n,
                4*n, 10*n, 6*n, 2*n, 8*n]
        }
      }
  
  var layout = {
    // title: "Basic Sankey Test",
    width: document.documentElement.clientWidth*3/4,
    height: document.documentElement.clientHeight*3/4,
    font: {
      size: 16,
      color: "black"
    },
  }

  var config = {
    staticPlot: true, // Disable click events
  };

  console.log("static!")


  return (
    <div>
      <Plot
        data={[data]}
        layout={layout}
        config={config}
      />
    </div>
  );
}

export default Sankey;

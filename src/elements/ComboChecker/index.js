import './style.css';
import React, { useCallback } from 'react';

function ComboChecker() {
  const URLSplit = window.document.URL.split('/');
  const timezone = URLSplit[URLSplit.length - 1];
  const colorsets = {
    morning: ['#FFCA2D', '#FFE9A9'],
    day: ['#8CD735', '#D8EDC0'],
    night: ['#3F51B5', '#CED3F0'],
  };
  const emptyFilling = {
    width: '100px',
    height: '1px',
    float: 'left',
    background: '#FFFFFF',
  };

  const emptyText = {
    color: '#FFFFFF',
  };

  const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
  deepFilling.background = colorsets[timezone][0];

  const deepText = JSON.parse(JSON.stringify(emptyText));
  deepText.color = colorsets[timezone][0];

  if (timezone == 'night') deepFilling['color'] = '#FFFFFF';

  const displayCombos1 = () => {
    let combos = [];
    combos.push(
        <div className="text">
            Wake up at 9AM
        </div>
    );
    combos.push(
        <div
            className="rcorners1"
            style={deepFilling}
        >
        </div>
    );
    combos.push(
      <div
          className="rcorners1"
          style={deepFilling}
      >
      </div>
  );
    combos.push(
        <div
            className="rcorners1"
            style={deepFilling}
        >
        </div>
    );
    combos.push(
        <div
          className="combotext"
          style={deepText}
        >
            2 COMBO!
        </div>
    );

    return combos;
  };

  const displayCombos2 = () => {
    let combos = [];
    combos.push(
        <div className="text">
            Check Mail Box
        </div>
    );
    combos.push(
        <div
            className="rcorners1"
            style={deepFilling}
        >
        </div>
    );
    combos.push(
        <div
            className="rcorners1"
            style={deepFilling}
        >
        </div>
    );
    combos.push(
        <div
          className="combotext"
          style={deepText}
        >
            2 COMBO!
        </div>
    );

    return combos;
  };

  return (
    <div className="combo">
        <hr className="hrcontainer" />
<<<<<<< HEAD
        <div>
            <div className="combocontainer">{displayCombos1()}</div>
            <div className="combocontainer">{displayCombos2()}</div>
=======
        <div className='combocontainer-box'>
            <div className="combocontainer">{displayCombos()}</div>
            <div className="combocontainer">{displayCombos()}</div>
>>>>>>> origin/main
        </div>
        <hr className="hrcontainer" />
    </div>
  );
}

export default ComboChecker;

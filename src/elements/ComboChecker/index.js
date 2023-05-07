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
  const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
  deepFilling.background = colorsets[timezone][0];
  if (timezone == 'night') deepFilling['color'] = '#FFFFFF';

  const displayCombos = useCallback(() => {
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
        <div className="comboyellow">
            2 COMBO!
        </div>
    );

    return combos;
  });

  return (
    <div className="combo">
        <hr className="hrcontainer" />
        <div className='combocontainer-box'>
            <div className="combocontainer">{displayCombos()}</div>
            <div className="combocontainer">{displayCombos()}</div>
        </div>
        <hr className="hrcontainer" />
    </div>
  );
}

export default ComboChecker;

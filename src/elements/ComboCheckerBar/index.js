import './style.css';
import React, { useCallback } from 'react';
import * as ROUTES from '../../constants/routes';

import allUsersRoutine from '../../routineInfos/allUsersRoutine';

function ComboCheckerBar(props) {
  const { name, timezone } = props;

  const URLSplit = window.document.URL.split('/');  

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

  const displayCombos = () => {
    let combos = [];
    combos.push(
      <a className="text" href={ROUTES.ROUTINE + '/' + timezone + '/wakeup'}>
        {name === 'WakeUp'? 'Wake Up at 10:00':
          name === 'SNSUsage'? 'SNS ↓ 45 min':
          name === 'UVExposure'? 'Enjoy sunshine ↑ 1 hr.': 
          name === 'study'? 'Study ↑ 60 min.': 
          name === 'Exercise'? 'Exercise ↑ 1 hr.' : name
          }
      </a>
    );
    combos.push(<div className="rcorners1" style={deepFilling}></div>);
    combos.push(<div className="rcorners1" style={deepFilling}></div>);
    combos.push(<div className="rcorners1" style={deepFilling}></div>);
    combos.push(
      <div className="combotext" style={deepText}>
        3 COMBO!
      </div>
    );

    return combos;
  };



  return (
    <div className="combocontainer">{displayCombos()}</div>
  );
}

export default ComboCheckerBar;

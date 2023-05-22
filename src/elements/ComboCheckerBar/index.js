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
    // width: '100px',
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

  const comboWakeUp = [7];
  const comboSNS = [2, 5, 2];
  const comboUV = [4, 2, 3];
  const comboStudy = [3];
  const comboTemp = [3, 4, 1, 2];

  const availablePages = [
    'WakeUp',
    'SNSUsage',
    'UVExposure',
    'study',
    'Exercise',
  ];

  const displayCombos = () => {
    let combos = [];
    combos.push(
      availablePages.includes(name) ? (
        <a className="text" href={ROUTES.ROUTINE + '/' + timezone + '/' + name}>
          {name === 'WakeUp'
            ? 'Wake up before 09:00 AM'
            : name === 'SNSUsage'
            ? 'SNS ↓ 45 min.'
            : name === 'UVExposure'
            ? 'Enjoy sunshine ↑ 1 hr.'
            : name === 'study'
            ? 'Study ↑ 60 min.'
            : 'Exercise ↑ 1 hr.'}
        </a>
      ) : (
        <span className="text">{name}</span>
      )
    );
    var comboList = [];
    if (name == 'WakeUp') {
      comboList = comboWakeUp;
    } else if (name == 'SNSUsage') {
      comboList = comboSNS;
    } else if (name == 'UVExposure') {
      comboList = comboUV;
    } else if (name == 'study') {
      comboList = comboStudy;
    } else {
      comboList = comboTemp;
    }

    for (let i of comboList) {
      combos.push(
        availablePages.includes(name) ? (
          <a
            className={'rcorners' + i}
            href={ROUTES.ROUTINE + '/' + timezone + '/' + name}
            style={deepFilling}
          >
            {' '}
          </a>
        ) : (
          <div
            className={'rcorners' + i}
            href={ROUTES.ROUTINE + '/' + timezone + '/' + name}
            style={deepFilling}
          >
            {' '}
          </div>
        )
      );
    }

    combos.push(
      <div className="combotext" style={deepText}>
        {comboList[comboList.length - 1]} COMBO!
      </div>
    );

    return combos;
  };

  return <div className="combocontainer">{displayCombos()}</div>;
}

export default ComboCheckerBar;

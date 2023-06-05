import './style.css';
import React, { useCallback } from 'react';
import * as ROUTES from '../../constants/routes';

import allUsersRoutine from '../../routineInfos/allUsersRoutine';

function ComboCheckerBar(props) {
  const { name, timezone, month } = props;

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

  const combo = {
    0: {
      wakeUp: [2, 5, 3, 2],
      sns: [2, 2],
      uv: [4, 3],
      study: [2, 3],
      exercise: [2],
      new: []
    },
    1: {
      wakeUp: [3, 4, 5],
      sns: [2, 2],
      uv: [5, 2, 2],
      study: [4, 3],
      exercise: [2, 2],
      new: []
    },
    2: {
      wakeUp: [5, 2, 4],
      sns: [3],
      uv: [3, 4],
      study: [4, 4, 2],
      exercise: [3],
      new: []
    },
    3: {
      wakeUp: [6, 2, 2],
      sns: [3, 4],
      uv: [2, 2, 3],
      study: [5, 3, 6, 2],
      exercise: [3, 2],
      new: []
    },
    4: {
      wakeUp: [7, 2],
      sns: [2, 5, 2],
      uv: [4, 2, 3],
      study: [5, 8, 7, 4],
      exercise: [2, 3, 2],
      new: []
    },
    5: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
    6: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
    7: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
    8: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
    9: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
    10: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
    11: {
      wakeUp: [],
      sns: [],
      uv: [],
      study: [],
      exercise: [],
      new: []
    },
  }


  const availablePages = ['WakeUp', 'SNSUsage', 'UVExposure', 'study', 'step'];

  const displayCombos = () => {
    const combos = [];
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
            : 'Walk ↑ 3000 steps'}
        </a>
      ) : (
        <span className="text">{name}</span>
      )
    );
    var comboList = [];
    if (name == 'WakeUp') {
      comboList = combo[month].wakeUp;
    } else if (name == 'SNSUsage') {
      comboList = combo[month].sns;
    } else if (name == 'UVExposure') {
      comboList = combo[month].uv;
    } else if (name == 'study') {
      comboList = combo[month].study;
    } else if (name == 'step') {
      comboList = combo[month].exercise;
    } else {
      comboList = combo[month].new;
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

    (comboList.length != 0) && combos.push(
      <div className="combotext" style={deepText}>
        {comboList[comboList.length - 1]} COMBO!
      </div>
    );

    return combos;
  };

  return <div className="combocontainer">{displayCombos()}</div>;
}

export default ComboCheckerBar;

import React, { useEffect, useState } from 'react';
import './style.css';

function capitalizeFirstLetter(string) {
  var onlyString = string.substring(1, string.length - 1);
  return onlyString.charAt(0).toUpperCase() + onlyString.slice(1);
}

function CreateModal(props) {
  const { setModalOpen, onAddBtnClick } = props;

  const URLSplit = window.document.URL.split('/');

  var timezone =
    URLSplit.length >= 5 ? URLSplit[URLSplit.length - 1] : 'morning';

  const colorsets = {
    morning: ['#FFCA2D', '#FFE9A9'],
    day: ['#8CD735', '#D8EDC0'],
    night: ['#3F51B5', '#CED3F0'],
  };

  const emptyFilling = {
    background: '#FFFFFF',
  };

  const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
  deepFilling.background = colorsets[timezone][0];
  if (timezone == 'night') {
    deepFilling.color = '#FFFFFF';
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const hourList = [7, 8, 9, 10, 11];
  const dayHourList = [12, 1, 2, 3, 4, 5];
  const nightHourList = [9, 10, 11];
  const minuteList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const morningList = [
    ['goOut', '🚪 Go out'],
    ['study', '📝 Study'],
  ];
  const dayList = [
    ['goOut', '🚪 Go out'],
    ['SNSusage', '🌐 Use SNS'],
  ];
  const nightList = [['sleepBefore', '💤 Sleep']];
  const value2name = {
    goOut: 'Go out ',
    study: 'Study ↑ ',
    SNSusage: 'SNS ↓ ',
    sleepBefore: 'Sleep ',
  };

  let initialSelected = '';
  if (timezone === 'morning' || timezone === 'day') initialSelected = 'goOut';
  else initialSelected = 'sleepBefore';
  let initialHour = '';
  if (timezone === 'morning') initialHour = '7';
  else if (timezone === 'day') initialHour = '12';
  else initialHour = '9';

  const [Selected, setSelected] = useState(initialSelected);
  const [GoalHour, setGoalHour] = useState(initialHour);
  const [GoalMin, setGoalMin] = useState('0');

  const handleSelect = (e) => {
    if (e.target.value === 'study' || e.target.value === 'SNSusage')
      setGoalHour('0');
    setSelected(e.target.value);
  };
  const handleGoalHour = (e) => {
    setGoalHour(e.target.value);
  };
  const handleGoalMin = (e) => {
    setGoalMin(e.target.value);
  };
  const handleAddBtnClick = () => {
    let routineTitle = value2name[Selected];
    switch (Selected) {
      case 'goOut':
        routineTitle +=
          'before ' +
          GoalHour.padStart(2, '0') +
          ':' +
          GoalMin.padStart(2, '0') +
          (timezone === 'morning' ? ' AM' : ' PM');
        break;
      case 'study':
        routineTitle += GoalHour + ' hr. ' + GoalMin.padStart(2, '0') + ' min.';
        break;
      case 'SNSusage':
        routineTitle += GoalHour + ' hr. ' + GoalMin.padStart(2, '0') + ' min.';
        break;
      default:
        routineTitle +=
          'before ' +
          GoalHour.padStart(2, '0') +
          ':' +
          GoalMin.padStart(2, '0') +
          (timezone === 'morning' ? ' AM' : ' PM');
        break;
    }

    onAddBtnClick(routineTitle);
    closeModal();
  };

  const capitalizedTimezone = capitalizeFirstLetter(JSON.stringify(timezone));

  return (
    <div className="createModal" align="left">
      <div align="middle" className="modalTitle">
        <b>New {capitalizedTimezone} Routine</b>
      </div>
      <form className="modalBody">
        <div className="customBlock">
          <label>Routine</label>
          <hr />
          <select
            className="dropdownCustom"
            onChange={handleSelect}
            value={Selected}
          >
            {timezone === 'morning'
              ? morningList.map((value) => (
                  <option value={value[0]} key={value[1]}>
                    {value[1]}
                  </option>
                ))
              : timezone === 'day'
              ? dayList.map((value, item) => (
                  <option value={value[0]} key={value[1]}>
                    {value[1]}
                  </option>
                ))
              : timezone === 'night' &&
                nightList.map((value, item) => (
                  <option value={value[0]} key={value[1]}>
                    {value[1]}
                  </option>
                ))}
          </select>
        </div>
        {Selected === 'sleepBefore' && timezone === 'night' && (
          <div className="customBlock">
            <label>Goal</label>
            <hr />
            Ealier than
            <select className="dropdownCustomTime" onChange={handleGoalHour}>
              {nightHourList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            :
            <select className="dropdownCustomTime" onChange={handleGoalMin}>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            PM
          </div>
        )}
        {Selected === 'goOut' && timezone === 'morning' && (
          <div className="customBlock">
            <label>Goal</label>
            <hr />
            Ealier than
            <select className="dropdownCustomTime" onChange={handleGoalHour}>
              {hourList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            :
            <select className="dropdownCustomTime" onChange={handleGoalMin}>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            AM
          </div>
        )}
        {Selected === 'goOut' && timezone === 'day' && (
          <div className="customBlock">
            <label>Goal</label>
            <hr />
            Ealier than
            <select className="dropdownCustomTime" onChange={handleGoalHour}>
              {dayHourList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            :
            <select className="dropdownCustomTime" onChange={handleGoalMin}>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            PM
          </div>
        )}
        {Selected == 'study' && (
          <div className="customBlock">
            <label>Goal</label>
            <hr />
            More than
            <select className="dropdownCustomTime" onChange={handleGoalHour}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            Hour
            <select className="dropdownCustomTime" onChange={handleGoalMin}>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            Min
          </div>
        )}
        {Selected === 'SNSusage' && (
          <div className="customBlock">
            <label>Goal</label>
            <hr />
            Less than
            <select className="dropdownCustomTime" onChange={handleGoalHour}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            Hour
            <select className="dropdownCustomTime" onChange={handleGoalMin}>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            Min
          </div>
        )}
        <div className="customBlock">
          <label>Adjstment Period</label>
          <hr />
          <select className="dropdownCustom">
            <option value="none">None</option>
            <option value="oneWeek">1 week</option>
            <option value="twoWeek">2 weeks</option>
            <option value="threeWeek">3 weeks</option>
          </select>
        </div>
        <br />
      </form>
      <div className="modalFooter">
        <button className="xButton" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="oButton"
          style={deepFilling}
          onClick={handleAddBtnClick}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateModal;

import React, { useEffect, useState } from 'react';
import './style.css';

// import TimePicker from './timePicker';
// import TimePickerModal from './timePickerModal';
import TimePickerButton from './timePickerButton';
import TimePickerModal from './timePickerModal';
import { Timeline } from '@mui/icons-material';

function CreateModal({ setModalOpen }) {

  const URLSplit = window.document.URL.split('/');

  var timezone =
  URLSplit.length >= 5 ? URLSplit[URLSplit.length - 1] : 'morning';

  const colorsets = {
    morning: ['#FFCA2D', '#FFE9A9'],
    day: ['#8CD735', '#D8EDC0'],
    night: ['#3F51B5', '#CED3F0'],
  };

  const emptyFilling = {
      background: '#FFFFFF'
  };

  const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
  deepFilling.background = colorsets[timezone][0];
  if (timezone == 'night') {
      deepFilling.color = '#FFFFFF';
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const hourList = [7, 8, 9, 10, 11]
  const minuteList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
      <div className='createModal' align="left"> 
        <div align="middle" className='modalTitle'>
          <b>New Morning Routine</b>
        </div>
        <form className='modalBody'>
          <div className='customBlock'>
            <label>Routine</label>
            <hr/>
            <select className='dropdownCustom'onChange={handleSelect} value={Selected}>
              <option value="wakeUp">🛏️ Wake up</option>
              <option value="goOut">🚪 Go out</option>
              <option value="exercise">🏃 Exercise</option>
            </select>
          </div>
          {(Selected === "" || Selected === "wakeUp" || Selected === "goOut")
          && <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            Ealier than
            <select className='dropdownCustomTime'>
            {hourList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            :
            <select className='dropdownCustomTime'>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            AM
          </div>}
          {Selected=="exercise"
          && <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            More than
            <select className='dropdownCustomTime'>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            Hour
            <select className='dropdownCustomTime'>
              {minuteList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            Min
          </div>}
          <div className='customBlock'>
            <label>Adjstment Period</label>
            <hr/>
            <select className='dropdownCustom'>
              <option value="none">None</option>
              <option value="oneWeek">1 week</option>
              <option value="twoWeek">2 weeks</option>
              <option value="threeWeek">3 weeks</option>
            </select>
          </div>
          <br/>
        </form>
        <div className='modalFooter'>
            <button className='xButton' onClick={closeModal}>
                Cancel
            </button>
            <button className='oButton' style={deepFilling}>
              Create
            </button>
          </div>
      </div>
  );
}

export default CreateModal;
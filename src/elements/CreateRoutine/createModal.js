import React, { useEffect, useState } from 'react';
import './style.css';

// import TimePicker from './timePicker';
// import TimePickerModal from './timePickerModal';
import TimePickerButton from './timePickerButton';
import TimePickerModal from './timePickerModal';
import { Timeline } from '@mui/icons-material';

function capitalizeFirstLetter(string) {
  var onlyString = string.substring(1, string.length-1);
  return onlyString.charAt(0).toUpperCase() + onlyString.slice(1);
}

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
  const dayHourList = [12, 1, 2, 3, 4, 5]
  const nightHourList = [9, 10, 11]
  const minuteList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  const [Selected, setSelected] = useState("");

  const morningList = [["goOut", "🚪 Go out"], ["study", "📝 Study"]]
  const dayList = [["goOut", "🚪 Go out"], ["SNSusage", "🌐 Use SNS"]]
  const nightList = [["sleepBefore", "💤 Sleep"]]

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const capitalizedTimezone = capitalizeFirstLetter(JSON.stringify(timezone))

  return (
      <div className='createModal' align="left"> 
        <div align="middle" className='modalTitle'>
          <b>New {capitalizedTimezone} Routine</b>
        </div>
        <form className='modalBody'>
          <div className='customBlock'>
            <label>Routine</label>
            <hr/>
            <select className='dropdownCustom'onChange={handleSelect} value={Selected}>
              {timezone == "morning" ?
                morningList.map((value) => (
                  <option value={value[0]} key={value[1]}>
                    {value[1]}
                  </option>
                )):
              timezone == "day"?
              dayList.map((value, item) => (
                <option value={value[0]} key={value[1]}>
                    {value[1]}
                  </option>
              )):
              timezone === "night" &&
                nightList.map((value, item) => (
                  <option value={value[0]} key={value[1]}>
                    {value[1]}
                  </option>
                ))
              }
            </select>
          </div>
          {(Selected === "" || Selected === "sleepBefore") && (timezone == "night")
          && <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            Ealier than
            <select className='dropdownCustomTime'>
            {nightHourList.map((item) => (
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
            PM
          </div>}
          {((Selected === "" || Selected === "goOut") && (timezone == "morning"))
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
          {(Selected === "" || Selected === "goOut") && (timezone == "day")
          && <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            Ealier than
            <select className='dropdownCustomTime'>
            {dayHourList.map((item) => (
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
            PM
          </div>}
          {Selected=="study"
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
          {Selected=="SNSusage"
          && <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            Less than
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
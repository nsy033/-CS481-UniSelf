import React, { useEffect, useState } from 'react';
import './style.css';

// import TimePicker from './timePicker';
// import TimePickerModal from './timePickerModal';
import TimePickerButton from './timePickerButton';

function CreateModal({ setModalOpen, id, done, text }) {

  const closeModal = () => {
    setModalOpen(false);
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
            <select className='dropdownCustom'>
              <option value="wakeUp">🛏️ Wake up</option>
              <option value="goOut">🚪 Go out</option>
              <option value="readNews">📰 Read news</option>
              <option value="exercise" selected>🏃 Exercise</option>
            </select>
          </div>
          <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            <TimePickerButton/>
          </div>
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
            <button className='oButton'>Create</button>
          </div>
      </div>
  );
}

export default CreateModal;
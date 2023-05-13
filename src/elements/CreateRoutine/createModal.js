import React, { useEffect, useState } from 'react';
import './style.css';
import DatePicker from 'react-datepicker';

function CreateModal({ setModalOpen, id, done, text }) {

  const closeModal = () => {
    setModalOpen(false);
  };

  const [startDate, setStartDate] = useState(new Date());

  const TimePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    );
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
            <select>
              <option value="wakeUp">Wake up 🛏️</option>
              <option value="goOut">Go out 🚪</option>
              <option value="readNews">Read news 📰</option>
              <option value="exercise">Exercise 🏃</option>
            </select>
          </div>
          <div className='customBlock'>
            <label>Goal</label>
            <hr/>
            <div>
              <TimePicker/>
            </div>
          </div>
          <div className='customBlock'>
            <label>Adjstment Period</label>
            <hr/>
            <select>
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
            <button>Create</button>
          </div>
      </div>
  );
}

export default CreateModal;
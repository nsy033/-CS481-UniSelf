import './style.css';
import React, { useState, useEffect } from 'react';

function TimezoneBtns(props) {
  const { setters } = props;
  const [timezone, setTimezone] = useState('morning');

  return (
    <div className="timezoneBtn-box">
      <li className="morningBtn-box">
        <div
          onClick={() => {
            setters.morning();
            setTimezone('morning');
          }}
          className="morningBtn"
          id={`morning-${timezone === 'morning'}`}
        >
          Morning
          <br />
          🌻
        </div>
      </li>
      <li className="dayBtn-box">
        <div
          onClick={() => {
            setters.day();
            setTimezone('day');
          }}
          className="dayBtn"
          id={`day-${timezone === 'day'}`}
        >
          Day
          <br />
          🌈
        </div>
      </li>
      <li className="nightBtn-box">
        <div
          onClick={() => {
            setters.night();
            setTimezone('night');
          }}
          className="nightBtn"
          id={`night-${timezone === 'night'}`}
        >
          Night
          <br />
          🌙
        </div>
      </li>
    </div>
  );
}

export default TimezoneBtns;

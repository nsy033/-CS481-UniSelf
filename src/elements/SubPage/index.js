import './style.css';
import React, { useState, useEffect } from 'react';
import allUsersRoutine from '../../routineInfos/allUsersRoutine.json';

import CreateButton from '../CreateRoutine/createButton';

import Calendar from '../Calendar';
import ComboChecker from '../ComboChecker';

function SubPage() {
  const URLSplit = window.document.URL.split('/');

  var timezone = 'morning';
  if (URLSplit.length >= 5) {
    timezone = URLSplit[URLSplit.length - 1];
  }

  const myRoutineData = allUsersRoutine['USER1'];

  const timezoneRoutine = [];
  let myRoutine = myRoutineData[timezone];
  if (!Array.isArray(myRoutine)) {
    myRoutine = Object.keys(myRoutine);
  }
  for (let routine of myRoutine) {
    timezoneRoutine.push(routine);
  }

  const [myData, setMyData] = useState(timezoneRoutine);

  const onAddBtnClick = (newRoutineName) => {
    setMyData((prev) => [...prev, newRoutineName]);
  };

  return (
    <div className="pageBox">
      <div className="pageTitle">
        All about <br /> <b>User</b>'s <b>{timezone.toUpperCase()} ROUTINE</b>
        {timezone === 'morning' ? ' 🌻' : timezone === 'day' ? ' 🌈' : ' 🌙'}
      </div>

      <div className="flexrow">
        <Calendar />
        <CreateButton onAddBtnClick={onAddBtnClick} />
      </div>
      <ComboChecker myData={myData} />
    </div>
  );
}

export default SubPage;

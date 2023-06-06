import './style.css';
import React, { useState, useEffect, SyntheticEvent, Event } from 'react';
import allUsersRoutine from '../../routineInfos/allUsersRoutine.json';

import CreateButton from '../CreateRoutine/createButton';

import Calendar from '../Calendar';
import ComboChecker from '../ComboChecker';
import { Alert, Snackbar } from '@mui/material';

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
  const [myDataRaw, setMyDataRaw] = useState(timezoneRoutine);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("You've already added that routine!");
  const [month, setMonth] = useState(4);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const onAddBtnClick = (newRoutineName, rawSelected) => {
    if (myDataRaw.includes(rawSelected)) {
      setMessage("You've already added that routine!");
      setOpenSnackbar(true);
    } else if (newRoutineName.includes('0 hr. 00 min.')) {
      setMessage('Check your time goal range. It is invalid!');
      setOpenSnackbar(true);
    } else {
      setMyData((prev) => [...prev, newRoutineName]);
      setMyDataRaw((prev) => [...prev, rawSelected]);
    }
  };

  const PrevBtnClick = () => {
    setMonth((month + 11) % 12);
  };

  const NextBtnClick = () => {
    setMonth((month + 1) % 12);
  };

  return (
    <div className="pageBox">
      <div className="pageTitle">
        All about <br />
        My <b>{timezone.toUpperCase()} ROUTINE</b>
        {timezone === 'morning' ? ' 🌻' : timezone === 'day' ? ' 🌈' : ' 🌙'}
      </div>

      <div className="flexrow">
        <Calendar onPrevBtnClick={PrevBtnClick} onNextBtnClick={NextBtnClick} />
        <CreateButton onAddBtnClick={onAddBtnClick} />
      </div>
      <ComboChecker myData={myData} month={month} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubPage;

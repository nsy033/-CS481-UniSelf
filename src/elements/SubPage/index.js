import './style.css';
import React from 'react';

import CreateButton from '../CreateRoutine/createButton';

import Calendar from '../Calendar';
import ComboChecker from '../ComboChecker';

function SubPage() {
  const URLSplit = window.document.URL.split('/');
  const timezone = URLSplit[URLSplit.length - 1];

  return (
    <div className="pageBox">
      <div className="pageTitle">
        All about <br /> <b>User</b>'s <b>{timezone.toUpperCase()} ROUTINE</b>
        {timezone === 'morning' ? ' 🌻' : timezone === 'day' ? ' 🌈' : ' 🌙'}
      </div>
     
      <div className='flexrow'>
        <Calendar />
        <CreateButton/>
      </div>
      
      <ComboChecker />
    </div>
  );
}

export default SubPage;

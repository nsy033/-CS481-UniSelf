import './style.css';
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../../constants/routes';

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

      <Calendar />

      <div>
        <a href={ROUTES.ROUTINE + '/' + timezone + '/wakeup'}> Wake Up </a>
        <br />
        <a href={ROUTES.ROUTINE + '/' + timezone + '/checkMailBox'}>
          {' '}
          Check Mail Box{' '}
        </a>
      </div>

      <ComboChecker />
    </div>
  );
}

export default SubPage;

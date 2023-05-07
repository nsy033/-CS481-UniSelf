import './style.css';
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../../constants/routes';

import Calendar from '../Calendar';

function SubPage() {
  const URLSplit = window.document.URL.split('/');
  const timezone = URLSplit[URLSplit.length - 1];

  return (
    <div className="pageBox">
      <h1> SubPage </h1>
      <h2> TimeZone: {timezone}</h2>

      <div>
        <a href={ROUTES.ROUTINE + '/' + timezone + '/wakeup'}> Wake Up </a>
      </div>
      <Calendar />
    </div>
  );
}

export default SubPage;

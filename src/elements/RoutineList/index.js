import './style.css';
import React from 'react';
import * as ROUTES from '../../constants/routes';

function RoutineList() {
  const URLSplit = window.document.URL.split('/');
  const curPage = URLSplit[URLSplit.length - 1];
  const potentialTimezone = URLSplit[URLSplit.length - 2];

  let selectedType = 1;
  if (curPage == 'morning' || potentialTimezone == 'morning') selectedType = 2;
  else if (curPage == 'day' || potentialTimezone == 'day') selectedType = 3;
  else if (curPage == 'night' || potentialTimezone == 'night') selectedType = 4;

  return (
    <div className="RoutineList">
      <li className="sub-routines-box">
        <a href={ROUTES.SUB + '/morning'} className="morning">
          Morning 🌻
        </a>
        <ul>
          <li>Wake up before 09:00 AM</li>
          <li>SNS ↓ 45 min.</li>
        </ul>
      </li>
      <li className="sub-routines-box">
        <a href={ROUTES.SUB + '/day'} className="day">
          Day 🌈
        </a>
        <ul>
          <li>Enjoy sunshine ↑ 1 hr.</li>
          <li>Study ↑ 60 min.</li>
        </ul>
      </li>
      <li className="sub-routines-box">
        <a href={ROUTES.SUB + '/night'} className="night">
          Night 🌙
        </a>
        <ul>
          <li>Exercise ↑ 1 hr.</li>
        </ul>
      </li>
    </div>
  );
}

export default RoutineList;

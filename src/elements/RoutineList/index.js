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
          <li>
            <a className="text" href={ROUTES.ROUTINE + '/morning/WakeUp'}>
              Wake up before 09:00 AM
            </a>
          </li>
          <li>
            <a className="text" href={ROUTES.ROUTINE + '/morning/SNSUsage'}>
              SNS ↓ 45 min.
            </a>
          </li>
        </ul>
      </li>
      <li className="sub-routines-box">
        <a href={ROUTES.SUB + '/day'} className="day">
          Day 🌈
        </a>
        <ul>
          <li>
            <a className="text" href={ROUTES.ROUTINE + '/day/UVExposure'}>
              Enjoy sunshine ↑ 1 hr.
            </a>
          </li>
          <li>
            <a className="text" href={ROUTES.ROUTINE + '/day/study'}>
              Study ↑ 60 min.
            </a>
          </li>
        </ul>
      </li>
      <li className="sub-routines-box">
        <a href={ROUTES.SUB + '/night'} className="night">
          Night 🌙
        </a>
        <ul>
          <li>
            <a className="text" href={ROUTES.ROUTINE + '/night/step'}>
              Walk ↑ 3000 steps
            </a>
          </li>
        </ul>
      </li>
    </div>
  );
}

export default RoutineList;

import './style.css';
import React, { useEffect, useState } from 'react';
import { COLORSETS } from '../../constants/colorset';
import * as ROUTES from '../../constants/routes';

function RoutineList(props) {
  const { pageType, setters } = props;
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
        {pageType === 'mainPage' ?
        <a href={ROUTES.SUB + '/morning'} className="morning">
          Morning 🌻
        </a>
        :
        <div onClick={()=>setters.morning()} className="morning">
          Morning 🌻
        </div>
        }
        <ul>
          <li>Wake up at 9AM</li>
          <li>Check mail box</li>
        </ul>
      </li>
      <li className="sub-routines-box">
        {pageType === 'mainPage' ?
        <a href={ROUTES.SUB + '/day'} className="day">
          Day 🌈
        </a>
        :
        <div onClick={()=>setters.day()} className="day">
          Day 🌈
        </div>
        }
        <ul>
          <li>Use less SNS</li>
        </ul>
      </li>
      <li className="sub-routines-box">
        {pageType === 'mainPage' ?
        <a href={ROUTES.SUB + '/night'} className="night">
          Night 🌙
        </a>
        :
        <div onClick={()=>setters.night()} className="night">
          Night 🌙
        </div>
        }
        <ul>
          <li>Exercise more than 1 hr.</li>
          <li>Write diary</li>
        </ul>
      </li>
    </div>
  );
}

export default RoutineList;

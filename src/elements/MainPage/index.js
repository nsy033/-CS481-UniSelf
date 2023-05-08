import './style.css';
import React, { useEffect, useState } from 'react';
import RoutineList from '../RoutineList'
import Sankey from '../Sankey'

function MainPage() {
  return (
    <div className="pageBox">
      <h1 className='unboldHeading'>Hi, <b>USER👋</b> <br/>
      Take a look at your <b>ACHIEVEMENT RANKING</b> </h1>
      <div className='box-container'>
        <div>
          <h2>My Daily Routines</h2>
          <RoutineList pageType={'mainPage'}/>
        </div>
        <Sankey/>
      </div>
      
    </div>
  );
}

export default MainPage;

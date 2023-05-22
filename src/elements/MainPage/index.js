import './style.css';
import React, { useEffect, useState } from 'react';
import RoutineList from '../RoutineList';
// import Sankey from '../Sankey';
import Waves from '../Waves';

function MainPage() {
  return (
    <div className="pageBox">
      <h1 className="unboldHeading">
        Hi, <b>USER👋</b> <br />
        Take a look at your <b>OVERALL ROUTINES</b>{' '}
      </h1>
      <div className="box-container">
        <div className="homeRoutineList">
          <h2>My Daily Routines</h2>
          <RoutineList />
        </div>
        {/* <Sankey /> */}
        <Waves />
      </div>
    </div>
  );
}

export default MainPage;

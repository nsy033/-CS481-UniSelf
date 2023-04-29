import './style.css';
import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import SubPage from '../SubPage';
import * as ROUTES from '../../constants/routes';

function MainPage() {
  return (
    <div>
      <h1> MainPage </h1>
      <div>
        <a href={ROUTES.SUBMORNING}> Morning Sub Page </a>
      </div>
      <div>
        <a href={ROUTES.SUBDAY}> Day Sub Page </a>
      </div>
      <div>
        <a href={ROUTES.SUBNIGHT}> Night Sub Page </a>
      </div>
      <div>
        <a href={ROUTES.COMPANION}> Companion Page </a>
      </div>
    </div>
  );
}

export default MainPage;

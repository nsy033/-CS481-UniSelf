import './style.css';
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../../constants/routes';

function MainPage() {
  return (
    <div>
      <h1> MainPage </h1>
      <div>
        <a href={ROUTES.SUB + '/morning'}> Morning Sub Page </a>
      </div>
      <div>
        <a href={ROUTES.SUB + '/day'}> Day Sub Page </a>
      </div>
      <div>
        <a href={ROUTES.SUB + '/night'}> Night Sub Page </a>
      </div>
      <div>
        <a href={ROUTES.COMPANION}> Companion Page </a>
      </div>
    </div>
  );
}

export default MainPage;

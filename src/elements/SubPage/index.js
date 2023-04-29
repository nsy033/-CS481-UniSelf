import './style.css';
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../../constants/routes';

function SubPage() {
  const URLSplit = window.document.URL.split('/');
  const timezone = URLSplit[URLSplit.length - 1];

  return (
    <div>
      <h1> SubPage </h1>
      <h2> TimeZone: {timezone}</h2>

      <div>
        <a href={ROUTES.ROUTINE + '/wakeup'}> Wake Up </a>
      </div>
    </div>
  );
}

export default SubPage;

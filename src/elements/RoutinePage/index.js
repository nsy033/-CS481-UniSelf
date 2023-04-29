import './style.css';
import React, { useEffect, useState } from 'react';

function RoutinePage() {
  const URLSplit = window.document.URL.split('/');
  const routine = URLSplit[URLSplit.length - 1];

  return (
    <div className="pageBox">
      <h1> RoutinePage </h1>
      <h2> Routine: {routine}</h2>
    </div>
  );
}

export default RoutinePage;

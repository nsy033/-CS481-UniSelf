import './style.css';
import React, { useEffect, useState } from 'react';
import FlowGraph from '../FlowGraph';
import DetailGraph from '../DetailGraph'

function RoutinePage() {
  const URLSplit = window.document.URL.split('/');
  const routine = URLSplit[URLSplit.length - 1];

  return (
    <div className="pageBox">
      <h1> RoutinePage </h1>
      <h2> Routine: {routine}</h2>
      <FlowGraph/>
      <DetailGraph/>
    </div>
  );
}

export default RoutinePage;

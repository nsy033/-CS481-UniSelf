import './style.css';
import React from 'react';
import FlowGraph from '../FlowGraph';
import DetailGraph from '../DetailGraph'
import { Icon } from '@iconify/react';

function RoutinePage() {
  const URLSplit = window.document.URL.split('/');
  // const routine = URLSplit[URLSplit.length - 1];
  const timezone = URLSplit[URLSplit.length - 2];

  return (
    <div className="pageBox">
      <a href={'/sub/' + timezone}>
        <div className="button">
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
        </div>
        <div className="back">BACK</div>
      </a>
      <h1> 🛏️ Wake up at 9AM </h1>
      {/* <h1> RoutineName </h1> */}
      {/* <h2> Routine: {routine}</h2> */}
      <FlowGraph/>
      <DetailGraph/>
    </div>
  );
}

export default RoutinePage;

import './style.css';
import React from 'react';
import FlowGraph from '../FlowGraph';
import FlowGraph_time from '../FlowGraph_time';
import DetailGraph from '../DetailGraph';
import DetailGraph_time from '../DetailGraph_time';
import { Icon } from '@iconify/react';

// 🚲 Ride Bicycle more than 30 min

const routinesets = {
  // morning: ['🛏️ Wake up before 9AM', '📱 Use SNS less than 45 min'],
  morning: {
    WakeUp: '🛏️ Wake up before 9AM.',
    SNSUsage: '📱 Use SNS less than 45 min.',
  },
  day: {
    study: '📚 Study more than 1 hr.',
    UVExposure: '🌞 Enjoy sunshine more than 1 hr.',
  },
  night: { Exercise: '🏃 Exercise more than 1 hr.' },
};

function RoutinePage() {
  const URLSplit = window.document.URL.split('/');
  // const routine = URLSplit[URLSplit.length - 1];
  const timezone = URLSplit[URLSplit.length - 2];
  const routine = URLSplit[URLSplit.length - 1];
  var is_time = true;
  if (routine == 'SNSUsage' || routine == 'study') is_time = false;
  const RoutineName = routinesets[timezone][routine];

  return (
    <div className="pageBox">
      <a href={'/sub/' + timezone}>
        <div className="button">
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
        </div>
        <div className="back">BACK</div>
      </a>
      <h1> {RoutineName} </h1>
      {is_time ? <FlowGraph_time /> : <FlowGraph />}
      {is_time ? <DetailGraph_time /> : <DetailGraph />}
    </div>
  );
}

export default RoutinePage;

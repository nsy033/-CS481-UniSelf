import './style.css';
import React from 'react';
import FlowGraph from '../FlowGraph';
import DetailGraph from '../DetailGraph'
import { Icon } from '@iconify/react';

// 🚲 Ride Bicycle more than 30 min

const routinesets = {
  // morning: ['🛏️ Wake up before 9AM', '📱 Use SNS less than 45 min'],
  morning: {wakeup: '🛏️ Wake up before 9AM', lessSNS: '📱 Use SNS less than 45 min'},
  day: {study: '📚 Study more than 1 hr', sunshine: '🌞 Enjoy sunshine more than 1 hr'},
  night: {exercise: '🏃 Exercise more than 1 hr'},
};

function RoutinePage() {
  const URLSplit = window.document.URL.split('/');
  // const routine = URLSplit[URLSplit.length - 1];
  const timezone = URLSplit[URLSplit.length - 2];
  const routine = URLSplit[URLSplit.length - 1];
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
      <FlowGraph/>
      <DetailGraph/>
    </div>
  );
}

export default RoutinePage;

import './style.css';
import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';

import companionList from './companion_list.json';
import CompanionScroll from '../CompanionScroll';
import CompanionHeatmap from '../CompanionHeatmap';

function CompanionPage() {
  return (
    <div className="pageBox">
      <div className="pageTitle">
        My Routine companions 🙌
        <span
          className="addIcon"
          onClick={() => {
            alert('TODO: add/delete companion');
          }}
        >
          <Icon icon="material-symbols:add" color="#ccc" />
        </span>
      </div>
      <CompanionScroll list={companionList} />

      <div className="emptySpace" />

      <div className="pageTitle">
        Take a look with <b>COMPANIONS' RECORD</b>
      </div>
      <CompanionHeatmap list={companionList} />
    </div>
  );
}

export default CompanionPage;

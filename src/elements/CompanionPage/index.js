import './style.css';
// import allUsersRoutine from '../../routineInfos/allUsersRoutine_demo';
import allUsersRoutine from '../../routineInfos/allUsersRoutine';
import companionList from '../../routineInfos/companionList';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import CompanionScroll from '../CompanionScroll';
import CompanionHeatmap from '../CompanionHeatmap';
import CompanionAddModal from '../CompanionAddModal';
import COLORSETS from '../../constants/colorset.js';
import TimezoneBtns from '../TimezoneBtns';

function CompanionPage() {
  const users = Object.keys(allUsersRoutine);
  const initialList = [];
  for (let user of users) {
    if (companionList.includes(allUsersRoutine[user]['name']))
      initialList.push(allUsersRoutine[user]);
  }
  const [list, setList] = useState(initialList);

  const updateCompanionList = (newList) => {
    setList(newList);
  };
  const [addModalOpen, setAddModalOpen] = useState(false);
  const closeAddmodal = () => {
    setAddModalOpen(false);
  };

  const emptyFilling = {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    float: 'left',
    background: '#FFFFFF',
    borderRadius: '50%',
  };
  const [fillings, setFillings] = useState({
    deep: JSON.parse(JSON.stringify(emptyFilling)),
    light: JSON.parse(JSON.stringify(emptyFilling)),
    gray: JSON.parse(JSON.stringify(emptyFilling)),
  });
  const [selectedTimezone, setSelectedTimezone] = useState('morning');

  useEffect(() => {
    const deep = JSON.parse(JSON.stringify(emptyFilling));
    deep.background = COLORSETS['morning'][0];
    const light = JSON.parse(JSON.stringify(emptyFilling));
    light.background = COLORSETS['morning'][1];
    const gray = JSON.parse(JSON.stringify(emptyFilling));
    gray.background = COLORSETS['gray'];
    if (selectedTimezone === 'night') deep['color'] = '#FFFFFF';
    else deep['color'] = 'black';

    setFillings({ deep: deep, light: light, gray: gray });
  }, []);

  useEffect(() => {
    const deep = JSON.parse(JSON.stringify(emptyFilling));
    deep.background = COLORSETS[selectedTimezone][0];
    const light = JSON.parse(JSON.stringify(emptyFilling));
    light.background = COLORSETS[selectedTimezone][1];
    const gray = JSON.parse(JSON.stringify(emptyFilling));
    gray.background = COLORSETS['gray'];

    setFillings({ deep: deep, light: light, gray: gray });
  }, [selectedTimezone]);

  const changeTimezone2Morning = () => {
    setSelectedTimezone('morning');
  };
  const changeTimezone2Day = () => {
    setSelectedTimezone('day');
  };
  const changeTimezone2Night = () => {
    setSelectedTimezone('night');
  };
  const setters = {
    morning: changeTimezone2Morning,
    day: changeTimezone2Day,
    night: changeTimezone2Night,
  };

  return (
    <div className="pageBox">
      <div className="pageTitle">
        My Routine Companions 🙌
        <span className="addIcon" onClick={() => setAddModalOpen(true)}>
          <Icon icon="material-symbols:add" className="addIconPlus" />
        </span>
        {addModalOpen ? (
          <CompanionAddModal
            closeAddmodal={closeAddmodal}
            timezoneColor={fillings.deep}
            allUsers={allUsersRoutine}
            companionList={list}
            updateCompanionList={updateCompanionList}
          ></CompanionAddModal>
        ) : null}
      </div>
      <CompanionScroll list={list} updateCompanionList={updateCompanionList} />

      <div className="emptySpace" />

      <div className="pageTitle">
        Take a look with <b>COMPANIONS' RECORD</b>
      </div>
      <div className="heatmapView">
        <div>
          <div className="subtitle">* Select timezone to lookup</div>
          <TimezoneBtns setters={setters} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginTop: '-20px',
          }}
        >
          <div className="heatmapDate">19/05/08 - 19/05/14</div>
          <CompanionHeatmap
            list={list}
            fillings={fillings}
            selectedTimezone={selectedTimezone}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanionPage;

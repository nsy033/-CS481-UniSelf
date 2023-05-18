import './style.css';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

function CompanionSearchUnit(props) {
  const { name, selectUser, isSelected } = props;

  return (
    <div className="searchUnitBox" onClick={() => selectUser(name)}>
      <div className={`searchUnit-${isSelected}`}>
        <div>
          <Icon
            icon="mdi:user-circle"
            color="#ccc"
            className="searchedUserIcon"
          />
        </div>
        {name}
      </div>
    </div>
  );
}

export default CompanionSearchUnit;

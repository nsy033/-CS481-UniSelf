import './style.css';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

function CompanionProfile(props) {
  const { info, isMe, timezone } = props;
  const timezoneColor =
    timezone === 'morning'
      ? '#FFCA2D'
      : timezone === 'day'
      ? '#8CD735'
      : '#3F51B5';

  return (
    <div className="profileBox">
      <Icon
        icon="mdi:user-circle"
        color={isMe ? timezoneColor : '#ccc'}
        className="userIcon"
      />
      {info.name}
    </div>
  );
}

export default CompanionProfile;

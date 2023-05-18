import React from 'react';
import './style.css';
import * as ROUTES from '../../constants/routes';

function RoutineItem({ id, done, text }) {
  return (
    <div>
        {id}
        {done}
        {text}
    </div>
  );
}

export default RoutineItem;
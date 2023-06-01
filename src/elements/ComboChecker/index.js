import './style.css';
import React, { useEffect, useState } from 'react';
import allUsersRoutine from '../../routineInfos/allUsersRoutine.json';
import ComboCheckerBar from '../ComboCheckerBar';

function ComboChecker(props) {
  const { myData, month } = props;
  const URLSplit = window.document.URL.split('/');
  var timezone =
    URLSplit.length >= 5 ? URLSplit[URLSplit.length - 1] : 'morning';

  //   const myRoutineData = allUsersRoutine['USER1'];

  //   const timezoneRoutine = [];
  //   let myRoutine = myRoutineData[timezone];
  //   if (!Array.isArray(myRoutine)) {
  //     myRoutine = Object.keys(myRoutine);
  //   }
  //   for (let routine of myRoutine) {
  //     timezoneRoutine.push(routine);
  //   }

  //   const [myData, setMyData] = useState(timezoneRoutine);
  //   console.log('myData: ' + myData);
  //   console.log(Array.isArray(myData));

  //   const onAddBtnClick = (event) => {
  //     // setMyData(myData.push("test"));
  //     setMyData((prev) => [...prev, 'test']);
  //     console.log('add test: ' + myData);
  //   };

  return (
    <div className="container-box">
      <div className="combo-title">
        How many <b>COMBO 👊</b> did I succeed?
        <div className="combo-subtitle">
          Click on each routine and view its details
        </div>
      </div>

      <div className="combo">
        <hr className="hrcontainer" />
        <div className="combocontainer-box">
          {/* <button onClick={onAddBtnClick}>test</button> */}
          {myData.map((name) => (
            <ComboCheckerBar name={name} timezone={timezone} month={month}/>
          ))}
          {/* {myData} */}
        </div>
        <hr className="hrcontainer" />
      </div>
    </div>
  );
}

export default ComboChecker;

import './style.css';
import React, { useEffect, useState } from 'react';

function SubPage() {
  const URLSplit = window.document.URL.split('/');
  const timezone = URLSplit[URLSplit.length - 1];

  return (
    <div>
      <h1> SubPage </h1>
      <h2> TimeZone: {timezone}</h2>
    </div>
  );
}

export default SubPage;

import './App.css';
import MainPage from './elements/MainPage';
import SubPage from './elements/SubPage';
import CompanionPage from './elements/CompanionPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.SUBPARAM} element={<SubPage />} />
        <Route path={ROUTES.COMPANION} element={<CompanionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

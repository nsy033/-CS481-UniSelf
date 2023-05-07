import './App.css';
import MainPage from './elements/MainPage';
import SubPage from './elements/SubPage';
import RoutinePage from './elements/RoutinePage';
import CompanionPage from './elements/CompanionPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Navbar from './elements/Navbar';

function App() {
  return (
    <div>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route exact path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.SUBPARAM} element={<SubPage />} />
          <Route path={ROUTES.ROUTINEPARAM} element={<RoutinePage />} />
          <Route path={ROUTES.COMPANION} element={<CompanionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

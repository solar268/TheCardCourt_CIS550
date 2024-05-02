import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OpenPackPage from './pages/OpenPackPage';
import './App.css';
import ManagementPage from './pages/ManagementPage';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/open-pack" element={<OpenPackPage />} />
          <Route path="/management" element={<ManagementPage />} />
          {/* <Route path="/dictionary" element={<DictionaryPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
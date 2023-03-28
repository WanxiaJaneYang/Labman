import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './index.css';
import MainRoute from './routes/MainRoute';
import AdminRoute from './routes/AdminRoute';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<MainRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();

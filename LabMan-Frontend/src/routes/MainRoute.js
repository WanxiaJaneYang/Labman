import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}

export default MainRoute;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/admin/dashboard/Index';
import PageNotFound from '../pages/PageNotFound';

function AdminRoute() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AdminRoute;

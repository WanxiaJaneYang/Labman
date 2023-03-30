import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequestPage from '../pages/admin/request';
import ReturnPage from '../pages/admin/return';
import EquipmentPage from '../pages/admin/equipment';
import PageNotFound from '../pages/PageNotFound';

function AdminRoute() {
    return (
        <Routes>
            <Route path="/request" element={<RequestPage />} />
            <Route path="/return" element={<ReturnPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AdminRoute;

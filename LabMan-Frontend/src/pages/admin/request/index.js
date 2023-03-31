import React from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import RequestRecordTable from "../../../components/tables/RequestRecordTable";

function RequestPage() {
    return (
        <div>
            <AdminLayout >
                <RequestRecordTable />
            </AdminLayout>
        </div>
    );
}

export default RequestPage;
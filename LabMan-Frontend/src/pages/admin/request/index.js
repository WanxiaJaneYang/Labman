import React from "react";
import AdminLayout from "../../../components/AdminLayout";
import RequestRecordTable from "../../../components/RequestRecordTable";

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
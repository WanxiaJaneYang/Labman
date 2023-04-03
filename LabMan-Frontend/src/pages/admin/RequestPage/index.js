import RequestRecordTable from "../../../components/tables/RequestRecordTable";
import SearchRequestRecord from "../../../components/Buttons/SearchRequestRecord";
import NewRequestRecord from "../../../components/Buttons/NewRequestRecord";
import ModifyRequestRecord from "../../../components/Buttons/ModifyRequestRecord";
import DeleteRequestRecord from "../../../components/Buttons/DeleteRequestRecord";
import { Row, Col, Space } from "antd";
import { useState } from "react";

const fetchData = () => {
    // You can pass fetchData as a prop to RequestRecordTable, so you can call it from the child component
    // Or move the fetchData function and relevant states to a higher-level component or context
    // ...
};

function RequestPage() {
    const { selectedRow, setSelectedRow } = useState(null);
    const handleRowSelected = (row) => {
        setSelectedRow(row);
    };

    return (
        <div>
            <Row justify="space-between" align="middle">
                <Col>
                    <NewRequestRecord />
                </Col>
                <Col>
                    <SearchRequestRecord />
                </Col>
            </Row>
            <RequestRecordTable onRowSelected={handleRowSelected} />
            <Row justify={"start"}>
                <Space>
                    <Col>
                        <ModifyRequestRecord selectedRow={selectedRow} onModify={fetchData} />
                    </Col>
                    <Col>
                        <DeleteRequestRecord selectedRow={selectedRow} onDelete={fetchData} />
                    </Col>
                </Space>
            </Row>

        </div>
    );
}

export default RequestPage;
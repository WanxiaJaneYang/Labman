import { Table } from 'antd';
import qs from 'qs';
import { useEffect, useState } from 'react';
const columns = [
    {
        title: 'Equipment Type',
        dataIndex: 'equipmentType',
    },
    {
        title: 'Count',
        dataIndex: 'count',
    },

];

// const data = [
//     {
//         key: '1',
//         time: '2021-05-01 12:00:00',
//         name: 'John Brown',
//         studentID: 'a123456789',
//         equipmentType: 'Microscope',
//         count: 1,
//     },
//     {
//         key: '2',
//         time: '2021-05-03 12:00:00',
//         name: 'Jim Green',
//         studentID: 'a123456789',
//         equipmentType: 'Microscope',
//         count: 1,
//     },
//     {
//         key: '3',
//         time: '2021-05-02 12:00:00',
//         name: 'Joe Black',
//         studentID: 'a123456789',
//         equipmentType: 'Microscope',
//         count: 1,
//     },
// ];

const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const EquipmentTable = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const fetchData = () => {
        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <Table
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
        />
    );
};
export default EquipmentTable;
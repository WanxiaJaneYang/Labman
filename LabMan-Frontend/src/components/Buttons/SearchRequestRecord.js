import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Input, Select, Space } from 'antd';

const options = [
    {
        value: 'studentID',
        label: 'Student ID',
    },
    {
        value: 'name',
        label: 'Name',
    },
    {
        value: 'equipmentType',
        label: 'Equipment Type',
    },
    {
        value: 'time',
        label: 'Time',
    },
];

const SearchRequestRecord = ({ onClick }) => {
    return (
        <Space.Compact>
            <Select defaultValue="studentID" options={options} />
            <Input defaultValue="input" />
            <Tooltip title="Search">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={onClick}
                />
            </Tooltip>
        </Space.Compact>
    );
}

export default SearchRequestRecord;
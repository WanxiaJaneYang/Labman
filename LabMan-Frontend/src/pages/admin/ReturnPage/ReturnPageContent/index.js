import ReturnTable from "../Components/Tables/ReturnTable";
import ReturnEquipmentButton from "../Components/Buttons/ReturnEquipmentButton";
import SearchReturnRecordBar from "../Components/Buttons/SearchReturnRecordBar";
import { Row, Col,Space } from "antd";
import ShowDetailButton from "../Components/Buttons/ShowDetailButton";
import {useReturnRecordContext} from "../Components/Context/ReturnRecordContext";

function ReturnPageContent() {
	const {
		selectedRow,
		setSelectedRow,
		loading,
		tableParams,
		data,
		fetchData,
	} = useReturnRecordContext();
	
	const handleRowSelected = (row) => {
		setSelectedRow(row);
	};

	return (
		<div>
			<Row justify="space-between" align="middle">
				<Col>
					<SearchReturnRecordBar />
				</Col>
			</Row>
			<ReturnTable onRowSelected={handleRowSelected} datasource={data} loading={loading} pagination={tableParams.pagination} />
			<Row justify={"start"}>
				<Space>
					<ReturnEquipmentButton selectedRow={selectedRow} onReturn={fetchData} />
					<ShowDetailButton selectedRow={selectedRow}/>
				</Space>
				
			</Row>

		</div>
	);
}

export default ReturnPageContent;
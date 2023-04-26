import { Radio } from "antd";
import { useActionHistoryContext } from "../../Context";
const TableDataSelector = () => {
	const {setTableSelection} = useActionHistoryContext();

	return (
		<Radio.Group
			onChange={e => setTableSelection(e.target.value)} 
			defaultValue="request" 
			buttonStyle="solid">
			<Radio.Button value="request">Request Log</Radio.Button>
			<Radio.Button value="equipment">Borrow Log</Radio.Button>
		</Radio.Group>
	);
};

export default TableDataSelector;
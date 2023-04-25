import { createContext,useState, useContext } from "react";
import { message } from "antd";

const ActionHistoryContext = createContext();

export const useActionHistoryContext = () => {
	return useContext(ActionHistoryContext);
};

const ActionHistoryProvider = ({ children }) => {
	const apiURL = "http://localhost:3008/logs";
	const [data, setData] = useState([]); 
	const [loading, setLoading] = useState(false);
	const [tableSelection, setTableSelection] = useState("request");

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true,
			pageSizeOptions: ["5", "10", "20", "50"],
		},
	});

	const fetchData = async () => {
		try{
			setLoading(true);
			const data = await getLogData();
			setData(data);
			setLoading(false);
			setTableParams({
				...tableParams,
				pagination: {
					...tableParams.pagination,
					total: data.length,
				},
			});
		}
		catch(error){
			message.error(error.message);
		}
	};

	const getLogData = async () => {
		const url=apiURL+"/"+tableSelection;

		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
			else {
				const errorMsg = await response.json();
				throw new Error(errorMsg.error);
			}
		}
		catch (error) {
			message.error(error.message);
		}
	};

	const onSearch = async(value) => {
		try{
			setLoading(true);
			const data = await searchLog(value);
			setData(data);
			setLoading(false);
			setTableParams({
				...tableParams,
				pagination: {
					...tableParams.pagination,
					total: data.length,
				},
			});
		}
		catch(error){
			message.error(error.message);
		}
	};

	const searchLog = async (values) => {
		try {
			const url=apiURL+"/"+tableSelection;
			const urlParams= new URLSearchParams(values);
			console.log(`${url}?${urlParams}`);
			const response = await fetch(`${url}?${urlParams}`);
			if (response.ok) {
				const data = await response.json();
				console.log("successfully retrived data:",data);
				return data;
			}
			else {
				const errorMsg = await response.json();
				throw new Error(errorMsg.error);
			}
		}
		catch (error) {
			message.error(error.message);
		}
	};
    
	return (
		<ActionHistoryContext.Provider
			value={{
				data,
				fetchData,
				loading,
				tableParams,
				setTableParams,
				onSearch,
				tableSelection,
				setTableSelection,
			}}
		>
			{children}
		</ActionHistoryContext.Provider>
	);
};

export default ActionHistoryProvider;
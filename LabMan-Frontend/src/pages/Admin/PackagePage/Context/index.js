import { useContext,createContext, useState} from "react";

const PackageContext = createContext();

export const usePackageContext = () => {
	return useContext(PackageContext);
};

const PackageProvider = ({ children, course_id }) => {
	const [data, setData] = useState([
		{
			package_id: "1",
			package_name: "Package 1",
		},
	]);
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: true,
			pageSizeOptions: ["5", "10", "20", "50"],
			total: 0,
		},
	});

	const fetchData = async () => {
		setLoading(true);
		console.log("course_id:", course_id);
		setData([]);
		setLoading(false);
	};

	return (
		<PackageContext.Provider value={
			{
				data,
				loading,
				tableParams,
				setTableParams,
				fetchData,
			}
		}>
			{children}
		</PackageContext.Provider>
	);
};

export default PackageProvider;
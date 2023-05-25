import { Breadcrumb, Divider } from "antd";
import {  useNavigate } from "react-router-dom";
import RequestCard from "./RequestCard";

const ViewRequestPage=()=>{
	const navigate = useNavigate();

	return(
		<div style={{
			marginTop:"20px",
			marginBottom:"20px",
		}}>
			<Breadcrumb items={[
				{
					title: "Homepage",
				},
				{
					title: "Request",
					onClick: () => {
						navigate("/homepage/request");
					}
				},
				{
					title: "View",
				},
			]}/>
			<Divider/>
			<RequestCard/>
		</div>
	);
};

export default ViewRequestPage;
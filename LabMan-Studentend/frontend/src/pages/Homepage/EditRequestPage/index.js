import { Breadcrumb, Divider} from "antd";
import { useNavigate } from "react-router-dom";
import EditRequestCard from "./EditRequestCard";

const EditRequestPage = () => {
	const navigate = useNavigate();
	const items = [
		{
			title: "Homepage",
			href: "/homepage",
			onclick: (e) => {
				e.preventDefault();
				navigate("/homepage");
			}
		},
		{
			title: "Request",
			href: "/homepage/request",
			onclick: (e) => {
				e.preventDefault();
				navigate("/homepage/request");
			}
		},
		{
			title: "Edit Request",
		},
	];
	return (
		<>
			<Breadcrumb items={items}/>
			<Divider/>
			<EditRequestCard />
		</>
	);
};

export default EditRequestPage;
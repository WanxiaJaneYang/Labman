import { Breadcrumb, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import ReturnedCard from "./ReturnedCard";

const ViewReturnedPage = () => {
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
			title: "Borrowing",
			href: "/homepage/return",
			onclick: (e) => {
				e.preventDefault();
				navigate("/homepage/return");
			}
		},
		{
			title: "View Returned",
		},
	];
    
	return (
		<div>
			<Breadcrumb items={items}/>
			<Divider/>
			<ReturnedCard/>
		</div>
	);
};

export default ViewReturnedPage;
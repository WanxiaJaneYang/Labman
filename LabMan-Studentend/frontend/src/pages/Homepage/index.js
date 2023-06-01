import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppBar } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import TaskIcon from "@mui/icons-material/Task";
import PersonIcon from "@mui/icons-material/Person";
import "./style.css";

const Homepage = () => {
	const [selectedKey, setSelectedKey] = useState(window.location.pathname);
	const navigate = useNavigate();
	const location = useLocation();

	const getFirstTwoPathSegments = (pathname) => {
		const segments = pathname.split("/");
		return `/${segments[1]}/${segments[2]}`;
	};

	const menuItems = [
		{
			key: "/homepage/request",
			label: "Request",
			icon: <SaveAsIcon />,
		},
		{
			key: "/homepage/return",
			label: "Return",
			icon: <TaskIcon />,
		},
		{
			key: "/homepage/announcement",
			label: "User",
			icon: <PersonIcon />,
		},
	];

	useEffect(() => {
		setSelectedKey(getFirstTwoPathSegments(location.pathname));
	}, [location]);

	return (
		<div className="root" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<AppBar position="static" className="app-bar" style={{ backgroundColor: "#001529" }}>
				<h3 className="title">
					LabMan
				</h3>
			</AppBar>
			<main style={{ flex: 1, overflow: "auto", padding: "10px" }}>
				<Outlet />
			</main>
			<BottomNavigation
				value={selectedKey}
				onChange={(event, newValue) => {
					navigate(newValue);
					setSelectedKey(newValue);
				}}
				showLabels
			>
				{menuItems.map((item) => (
					<BottomNavigationAction
						key={item.key}
						value={item.key}
						label={item.label}
						icon={item.icon}
					/>
				))}
			</BottomNavigation>
		</div>
	);
};

export default Homepage;

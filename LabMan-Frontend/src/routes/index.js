import { Navigate } from "react-router";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AdminLayout from "../components/Layout/AdminLayout";
import RequestPage from "../pages/Admin/RequestPage";
import ReturnPage from "../pages/Admin/ReturnPage";
import EquipmentPage from "../pages/Admin/EquipmentPage";

const routes = [
	{
		path: "/*",
		element: <PageNotFound />,
	},
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				path: "request",
				element: <RequestPage />,
			},
			{
				path: "return",
				element: <ReturnPage />,
			},
			{
				path: "equipment",
				element: <EquipmentPage />,
			}
		]
	}
];

export default routes;
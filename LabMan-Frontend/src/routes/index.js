import { Navigate } from "react-router";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AdminLayout from "../components/Layout/AdminLayout";

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
                element: <h1>Request Page</h1>,
            },
            {
                path: "return",
                element: <h1>Return Page</h1>,
            },
            {
                path: "equipment",
                element: <h1>Equipment Page</h1>,
            }
        ]
    }
];

export default routes;
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	useEffect(() => {
		// console.log("PrivateRoute: is authentificated:", isAuthenticated);
		if (!isAuthenticated) {
			navigate("/login", { state: { from: location } });
		}
	}, [isAuthenticated, navigate, location]);

	return isAuthenticated ? children : null;
};

export default PrivateRoute;

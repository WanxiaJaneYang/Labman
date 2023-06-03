import { useAuth } from "../../../../Context/AuthContext";
import { Button } from "antd";

const LogoutButton = () => {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<Button
			danger
			onClick={handleLogout}
			style={{ cursor: "pointer" }}
			size={40}
		>
			Log Out
		</Button>
	);
};

export default LogoutButton;

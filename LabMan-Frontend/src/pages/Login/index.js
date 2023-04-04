import LoginButton from "./components/LoginButton";
import UsernameInput from "./components/UsernameInput";
import UserPasswordInput from "./components/UserPasswordInput";
import { Row, Col, Card } from "antd";
import { useState } from "react";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="login-container"  style={{
			backgroundColor: "#f0f2f5",
			minHeight: "100vh",
		}}>
			<Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
				<Col xs={22} sm={16} md={12} lg={8} xl={6}>
					<Card title="Login" bordered={false}>
						<UsernameInput onChange={handleUsernameChange} />
						<br />
						<br />
						<UserPasswordInput onChange={handlePasswordChange} />
						<br />
						<br />
						<LoginButton username={username} password={password} />
					</Card>
				</Col>
			</Row>
		</div>
	);	  
}

export default Login;
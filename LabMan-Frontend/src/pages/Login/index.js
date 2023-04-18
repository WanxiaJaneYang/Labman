import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import "./Login.css";
import {useNavigate} from "react-router-dom";

const Login = () => {
	const Navigate = useNavigate();
	
	const onFinish = (values) => {
		Navigate("/admin/request");
		console.log("Received values of form: ", values);
	};

	return (
		<Row
			type="flex"
			justify="center"
			align="middle"
			style={{ minHeight: "100vh" }}
		>
			<Col xs={24} sm={16} md={12} lg={8} xl={6}>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Typography.Title level={1} style={{ color: "#1890ff" }}>
					Labman
					</Typography.Title>

					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your Username!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Username"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
              Log in
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};
export default Login;

// import LoginButton from "./components/LoginButton";
// import UsernameInput from "./components/UsernameInput";
// import UserPasswordInput from "./components/UserPasswordInput";
// import { Row, Col, Card } from "antd";
// import { useState } from "react";

// function Login() {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");

// 	const handleUsernameChange = (e) => {
// 		setUsername(e.target.value);
// 	};

// 	const handlePasswordChange = (e) => {
// 		setPassword(e.target.value);
// 	};

// 	return (
// 		<div className="login-container"  style={{
// 			backgroundColor: "#f0f2f5",
// 			minHeight: "100vh",
// 		}}>
// 			<Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
// 				<Col xs={22} sm={16} md={12} lg={8} xl={6}>
// 					<Card title="Login" bordered={false}>
// 						<UsernameInput onChange={handleUsernameChange} />
// 						<br />
// 						<br />
// 						<UserPasswordInput onChange={handlePasswordChange} />
// 						<br />
// 						<br />
// 						<LoginButton username={username} password={password} />
// 					</Card>
// 				</Col>
// 			</Row>
// 		</div>
// 	);
// }

// export default Login;

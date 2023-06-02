import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
	const Navigate = useNavigate();
	const { login } = useAuth();

	const onFinish = async (values) => {
		const { username, password } = values;
		try {
			await login(username, password);
			Navigate("/homepage/request");
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<div style={{
			backgroundImage: "url(https://ok8static.oktacdn.com/fs/bco/7/fs07e0idoLJktLOxM3l6)",
			backgroundPosition: "center", /* Center the image */
			backgroundRepeat: "no-repeat", /* Do not repeat the image */
			backgroundSize: "cover", /* Resize the background image to cover the entire container */
			height: "100vh", /* Set the height to 100% of the viewport */
		}}>
			<Row
				type="flex"
				justify="center"
				align="middle"
				style={{ minHeight: "100vh" }}
			>
				<Col xs={24} sm={16} md={12} lg={8} xl={6} style={{ display: "flex", justifyContent: "center" }}>
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
					>
						<Typography.Title level={1} className="labman-title" style={{ color: "#1890ff", fontWeight: 900, fontSize: 60, textAlign: "center" }}>
							LabMan
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
		</div>

	);
};
export default Login;
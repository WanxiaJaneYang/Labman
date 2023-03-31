import { Layout, Menu, theme } from "antd";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MyLayout.css";

const { Sider, Content } = Layout;

const MyLayout = ({ children, menuItems }) => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = React.useState(window.location.pathname?.split("/")[2]);
    useEffect(() => {
        setSelectedKey(window.location.pathname?.split("/")[2]);
    }, [location]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                >
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.link}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
};
export default MyLayout;

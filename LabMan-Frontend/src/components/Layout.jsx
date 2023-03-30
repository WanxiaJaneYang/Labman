import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DatabaseOutlined,
    ExportOutlined,
    ImportOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import './Layout.css';

const { Header, Sider, Content } = Layout;

const MyLayout = ({ defaultSelectedKeys = '1', children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="md" onCollapse={setCollapsed} >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[defaultSelectedKeys]}
                    items={[
                        {
                            key: '1',
                            icon: <ExportOutlined />,
                            label: 'Request',
                        },
                        {
                            key: '2',
                            icon: <ImportOutlined />,
                            label: 'Return',
                        },
                        {
                            key: '3',
                            icon: <DatabaseOutlined />,
                            label: 'Equipment',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default MyLayout;


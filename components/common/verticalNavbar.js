import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";

const { Header, Sider, Content } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Users",
    link: "/users",
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: "Calendar",
    link: "/calendar",
  },
];

function VerticalNavbar(props) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="layout" style={{ display: "flex", position: "sticky" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          {items.map((item) => {
            return (
              <Menu.Item key={item.key} onClick={() => router.push(item.link)}>
                {item?.icon}
                <span>{item?.label}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: "flex",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Button
            size={"large"}
            style={{ margin: "0.7rem 1.5rem 0.5rem auto" }}
            onClick={() => {
              localStorage.removeItem("userToken");
              router.push("/auth/login");
            }}
          >
            Logout
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            overflowX: "hidden",
          }}
        >
          {props.content}
        </Content>
      </Layout>
    </Layout>
  );
}
export default VerticalNavbar;

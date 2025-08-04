import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  PaperClipOutlined,
  UserSwitchOutlined,
  InsertRowLeftOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { UserDropdown } from "../../components";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "groups",
      icon: <TeamOutlined />,
      label: "Groups",
      onClick: () => navigate("/admin/groups"),
    },
    {
      key: "courses",
      icon: <PaperClipOutlined />,
      label: "Courses",
      onClick: () => navigate("/admin/courses"),
    },
    {
      key: "student",
      icon: <UserOutlined />,
      label: "Student",
      onClick: () => navigate("/admin/student"),
    },
    {
      key: "teacher",
      icon: <UserSwitchOutlined />,
      label: "Teacher",
      onClick: () => navigate("/admin/teacher"),
    },
    {
      key: "branches",
      icon: <BranchesOutlined />,
      label: "Branches",
      onClick: () => navigate("/admin/branches"),
    },
    {
      key: "rooms",
      icon: <InsertRowLeftOutlined />,
      label: "Rooms",
      onClick: () => navigate("/admin/rooms"),
    },
  ];

  const selectedKey = location.pathname.split("/")[2] || "groups";

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{
          background: "white",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
            color: "#1677ff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {!collapsed ? "Edu ERP" : "E"}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, height: "100vh" }}>
        <Header
          style={{
            height: 64,
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
          <UserDropdown />
        </Header>

        <Content
          style={{
            padding: 24,
            overflowY: "auto",
            height: "calc(100vh - 64px)",
            background: "#f5f5f5",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

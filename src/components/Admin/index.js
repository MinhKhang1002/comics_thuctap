import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Book from "./Book";
import Genre from "./Genre";
import Chapter from "./Chapter";
// import EmployeeDetail from "./EmployeesDetails";
// import DeliveryDocketDetails from "./DeliveryDocketDetails";
// import ReceivedDocketDetails from "./ReceivedDocketDetails";
// import CustomerDetails from "./CustomerDetails";
import User from "./User";
// import DeliveryDocket from "./DeliveryDocket";
// import CustomerDeliveryDocketDetails from "./CustomerDeliveryDocketDetails";
// import CreateReceiveDocket from "./CreateReceiveDocket";
import {
  DesktopOutlined,
  PieChartOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { tabState, key } from "../../store/login";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ProfileEmployee from "./ProfileEmployee";
import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

function Index(props) {
  const [tab, setTab] = useRecoilState(tabState);
  let navigate = useNavigate();
  const [keyValue, setKeyValue] = useRecoilState(key);

  const handleLogout = () => {
    localStorage.removeItem("key");
    setKeyValue(localStorage.getItem("key") || []);
    navigate("/login");
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        setTab(Number(key));
      },
    };
  }

  const items = [
    getItem("Book", "1", <BookOutlined />),
    getItem("Genre", "2", <PieChartOutlined />),
    getItem("Chapter", "3", <DesktopOutlined />),
    getItem("User", "9", <DesktopOutlined />),
    getItem("User Info", "11", <DesktopOutlined />),
  ];

  // const items = [UserOutlined, UserOutlined].map((icon, index) => ({
  //   key: String(index + 1),
  //   icon: React.createElement(icon),
  //   label: `nav ${index + 1}`,
  //   onClick: () => {
  //     setTab(index);
  //   },
  // }));

  return (
    <div>
      {" "}
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <div className="flex">
              <div></div>
              <h2>Quản lý truyện</h2>
              <Button type="primary" className="mt-5" onClick={handleLogout}>
                <span>Đăng xuất</span>
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
              }}
            >
              {tab === 1 && <Book></Book>}
              {tab === 2 && <Genre></Genre>}
              {tab === 3 && <Chapter></Chapter>}
              {tab === 9 && <User></User>}
              {tab === 11 && <ProfileEmployee></ProfileEmployee>}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;

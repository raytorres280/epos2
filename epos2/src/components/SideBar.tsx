import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

export default class SideBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }
  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="logo">
        <Menu
          defaultSelectedKeys={["4"]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to="/new-order">
              <div>
              <Icon style={{ fontSize: 25 }} type="upload" />
                <span>New Order</span>
              </div>
            </Link>
          </Menu.Item>
          
          <Menu.Item key="2">
            <Link to="/orders">
              <div>
                <Icon style={{ fontSize: 25 }} type="inbox" />
                <span>Orders</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/payments/">
              <div>
                <Icon style={{ fontSize: 25 }} type="credit-card" />
                <span>Pay</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/inventory">
              <div>
                <Icon style={{ fontSize: 25 }} type="shopping-cart" />
                <span>Inventory</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/customers">
              <div>
                <Icon style={{ fontSize: 25 }} type="user" />
                <span>Customers</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/dashboard">
              <div>
                <Icon style={{ fontSize: 25 }} type="pie-chart" />
                <span>Dashboard</span>
              </div>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

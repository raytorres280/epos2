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
          defaultSelectedKeys={["3"]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to="/new-order">
              <div>
              <Icon style={{ fontSize: 25 }} type="desktop" />
                <span>dashboard</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon style={{ fontSize: 25 }} type="inbox" />
            <span>Customers</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/customers">
              <div>
                <Icon style={{ fontSize: 25 }} type="user" />
                <span>dashboard</span>
              </div>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

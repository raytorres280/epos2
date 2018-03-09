import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

// const NEW_ORDER = '1'
// const ORDERS = '2'
// const PAYMENTS = '3'
// const INVENTORY = '4'
// const CUSTOMERS = '5'
// const DASHBOARD = '6'

// const routes = {
//  '0' 
// }

export default class SideBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: true,
      selectedKey: '/new-order'
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }
  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  componentWillMount() {
    this.setState({ selectedKey: this.props.location.pathname })
  }
  componentWillReceiveProps(newProps: any) {
    console.log('getting new props')
    console.log(this.props)
    console.log('new', newProps)
    if (newProps.history.location.pathname.includes('/payments/')) {
      // if i got a payment with router info (orderID)
      console.log('payment jump to order')
      this.setState({ selectedKey: '/payments' })
    } else {
      this.setState({ selectedKey: newProps.location.pathname })
    }
    
  }
  componentWillUpdate(newProps: any, newState: any) {
    console.log('updating..')
  }
  render() {
    console.log(this.props)
    return (
      <div className="logo">
        <Menu 
          defaultSelectedKeys={['/new-order']}
          mode="inline"
          theme="dark"
          selectedKeys={[this.state.selectedKey]}
        >
          <Menu.Item key="/new-order">
            <Link to="/new-order">
              <div>
                <Icon style={{ fontSize: 25 }} type="upload" />
                <span>New Order</span>
              </div>
            </Link>
          </Menu.Item>

          <Menu.Item key="/orders">
            <Link to="/orders">
              <div>
                <Icon style={{ fontSize: 25 }} type="inbox" />
                <span>Orders</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/payments">
            <Link to="/payments">
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
          <Menu.Item key="/customers">
            <Link to="/customers">
              <div>
                <Icon style={{ fontSize: 25 }} type="user" />
                <span>Customers</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard">
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

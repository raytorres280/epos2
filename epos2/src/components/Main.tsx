import * as React from 'react';
// import history from '../history'
import { Switch, Route, Redirect } from 'react-router-dom'
import SideBar from './SideBar'
import NewOrder from './NewOrder'
import Customers from './Customers'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

class Main extends React.Component {
  
  componentWillMount() {
    // history.push('/customers')
  }
  
  render() {
    return (
      <Layout>
        <Sider style={{ minHeight: '100vh' }} collapsible={true} collapsed={true}><SideBar /></Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Switch>
              <Route path="/new-order" component={NewOrder} />
              <Route path="/orders" />
              <Route path="/customers" component={Customers} />
              <Route path="/inventory" />
              <Redirect from="/" to="/customers" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Main;

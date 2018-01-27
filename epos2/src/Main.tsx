import * as React from 'react';
import history from './history'
import { Switch, Route } from 'react-router-dom'
import SideBar from './SideBar'
import NewOrder from './NewOrder'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

class Main extends React.Component {
  
  componentWillMount() {
    history.push('/new-order')
  }
  
  render() {
    return (
      <Layout>
        <Sider style={{ minHeight: '100vh' }} collapsible={true} collapsed={true}><SideBar /></Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Switch>
              <Route to="/new-order" component={NewOrder} />
              <Route to="/orders" />
              <Route to="/customers" />
              <Route to="/inventory" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Main;

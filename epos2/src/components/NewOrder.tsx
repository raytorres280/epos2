import * as React from "react";
import { Layout, List, Card } from "antd";
const { Sider, Content } = Layout;
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export interface AppProps {}

class NewOrder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      cart: [1, 2, 3],
      products: [{}]
    };
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.data.products !== this.props.data.products) {
      let keys = Object.keys(newProps.data.products[0]).filter(
        key => key !== "__typename"
      );
      let cols = keys.map(name => ({
        title: name,
        dataIndex: name,
        key: name
      }));
      this.setState({
        columns: cols,
        products: newProps.data.products
      });
    }
  }

  render() {
    return (
      <Layout>
        <Content>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={this.state.products}
            renderItem={item => (
              <List.Item>
                <Card title={item.name}>Card content</Card>
              </List.Item>
            )}
          />
        </Content>
        <Sider>
          <List
            dataSource={this.state.cart}
            renderItem={item => (
              <List.Item>
                <Card title={item}>Card content</Card>
              </List.Item>
            )}
          />
        </Sider>
      </Layout>
    );
  }
}
const query = gql`
  query {
    products {
      id
      name
    }
  }
`;

export default graphql(query)(NewOrder);

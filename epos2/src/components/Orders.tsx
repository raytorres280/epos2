import * as React from "react";
import { Table } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Tabs, List, Card, Button, Input } from "antd";
const TabPane = Tabs.TabPane;
// import MenuItem from "./MenuItem";

export interface AppProps {}

class Orders extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      orderToBeUpdated: [], // treat as queue that grows in case of server load.
      loadMore: false,
      columns: [{}],
      Orders: [{}]
    };
  }

  markOrderAsPrepared(order: any) {
    // handle the order update here
    this.setState({ loading: true })
    axios.put('', { id: order.id })
    // do some kind of condition that makes sure loading is false,
    // so that you cannot complete a second order until the first update comes back
    // from async ... this.state.loading
  }
  render() {
    let { orders } = this.props.data;
    return (
      <Tabs tabPosition={this.state.tabPosition}>
        <TabPane tab="Active" key="1">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={
              orders
                ? orders.filter(order => !order.paid && !order.prepared)
                : orders
            }
            renderItem={item => (
              <List.Item>
                <Card
                  title={name}
                  extra={<div style={styles.ticker}>{this.state.qty}</div>}
                  actions={[
                    <Button
                      key={1}
                      size="large"
                      onClick={() => this.setState({ qty: this.state.qty + 1 })}
                      type="primary"
                      icon={!this.state.loading && item.prepared ? 'check' : 'null'}
                      loading={this.state.loading && !item.prepared}
                    >
                      {!this.state.loading && item.prepared ? 'Done' : 'Complete Order'}
                    </Button>,
                    <Button
                      key={1}
                      size="large"
                      onClick={() => console.log('go to payments route with this order passed to params')}
                    >
                      Pay
                    </Button>
                  ]}
                >
                  <p>
                    {"ingredients:" +
                      "item.ingredients, dairy meat white flour"}
                  </p>
                  <p>instructions:</p>
                  <Input
                    size="large"
                    placeholder="no pickles, no cheese, etc."
                    value={this.state.instructions}
                    onChange={e =>
                      this.setState({ instructions: e.target.value })
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Completed" key="2">
          <Table
            columns={columns}
            expandedRowRender={order => (
              <Table
                columns={orderDetailsColumns}
                dataSource={order.lineItems}
                rowKey="id"
                pagination={false}
              />
            )}
            dataSource={
              orders
                ? orders.filter(order => order.paid && order.prepared)
                : orders
            }
            rowKey="id"
            pagination={false}
          />
        </TabPane>
      </Tabs>
    );
  }
}

const query = gql`
  {
    orders {
      id
      customer {
        first
        last
      }
      lineItems {
        id
        product {
          id
          name
        }
        purchasePrice
        qty
      }
      paid
      prepared
      createdAt
      isDelivery
    }
  }
`;

export default graphql<any, any>(query)(Orders);

const columns = [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "customer - first name",
    dataIndex: "customer.first"
  },
  {
    title: "customer - last name",
    dataIndex: "customer.last"
  }
];

const orderDetailsColumns = [
  {
    title: "Product Name",
    dataIndex: "product.name"
  },
  {
    title: "Quantity",
    dataIndex: "qty"
  },
  {
    title: "total",
    dataIndex: "qty",
    render: (text, item, index) => {
      return <p key={item.id}>{item.qty * item.purchasePrice}</p>;
    }
  }
];

const styles = {
  ticker: {
    backgroundColor: "aliceblue",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    border: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5
  }
};

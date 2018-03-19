import * as React from "react";
import { Table } from "antd";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Tabs, List, Card, Button } from "antd";
const TabPane = Tabs.TabPane;

export interface AppProps {}

class Orders extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      orderToBeUpdated: [], // treat as queue that grows in case of server load.
      loadMore: false,
      columns: [{}],
    };
  }
  componentWillUpdate(newProps: any, newState: any) {
    console.log('updating...')
  }
  onPay(order: any) {
    console.log('go to payments route with this order passed to params')
    this.props.history.push(`payments/${order.id}`)
  }
  markOrderAsPrepared(order: any) {
    // handle the order update here
    this.setState({ loading: true })
    this.props.updatePrepared({
      variables: { id: order.id }
    })
    .then(data => {
      // apollo update state automatically, just set state to loading: false
      this.setState({ loading: false })
    })
    .catch(err => console.log(err))
  }
  render() {
    let { orders } = this.props.fetchAllOrders || [];
    return (
      <Tabs tabPosition={this.state.tabPosition}>
        <TabPane tab="Active" key="1">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={
              orders
                ? orders.filter(order => !order.paid || !order.prepared)
                : orders
            }
            renderItem={order => (
              <List.Item key={order.id}>
                <Card
                  title={order.id}
                  extra={<div style={styles.ticker}>{order.lineItems.length}</div>}
                  actions={[
                    <Button
                      key={1}
                      size="large"
                      onClick={() => this.markOrderAsPrepared(order)}
                      type="primary"
                      icon={!this.state.loading && order.prepared ? 'check' : 'null'}
                      loading={this.state.loading && !order.prepared}
                      disabled={order.prepared}
                    >
                      {!this.state.loading && order.prepared ? 'Food ready' : 'Complete Order'}
                    </Button>,
                    <Button
                      key={1}
                      size="large"
                      onClick={() => this.onPay(order)}
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
                  <h3>{order.prepared}</h3>
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
      paid
      prepared
      createdAt
      isDelivery
      lineItems {
        id
        qty
        instructions
        purchasePrice
        product {
          id
          name
        }
      }
      customer {
        id
        first
        last
      }
    }
  }
`;
const updatePrepared = gql`
  mutation updateOrderPreparedStatus($id: String!) {
    updateOrderPreparedStatus(id: $id) {
      id
      prepared
      preparedAt
    }
  }
`

export default compose(
  graphql<any, any>(query, { name: "fetchAllOrders" }),
  graphql<any, any>(updatePrepared, { name: "updatePrepared" })
)(Orders);

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

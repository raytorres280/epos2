import * as React from "react";
import { Table } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export interface AppProps {}

class Orders extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      loadMore: false,
      columns: [{}],
      Orders: [{}]
    };
  }

  render() {
    return (
      <Table
        columns={columns}
        expandedRowRender={() => <p style={{ margin: 0 }}>hello world</p>}
        dataSource={this.props.data.orders}
      />
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
        product {
          id
          name
        }
        purchasePrice
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
    key: "id",
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

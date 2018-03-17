import * as React from "react";
import { Table, Card } from "antd";

import CartItemModel from '../models/CartItemModel'
export interface OverviewProps {
  cart: CartItemModel[];
  customer?: any;
}

export default (props: OverviewProps) => {
  let { cart } = props;
  let customer = props.customer || { first: 'select a', last: 'customer'}

  return (
    <div style={styles.container}>
      <Card
        title={customer.first + ' ' + customer.last}
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>address and stuff later</p>
      </Card>
      <br/>
      <Table pagination={false} columns={columns} dataSource={cart} />
    </div>
  );
};

const columns = [
  {
    title: "product name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "quantity",
    dataIndex: "qty",
    key: "qty"
  },
  {
    title: "price",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "instructions",
    dataIndex: "instructions",
    key: "instructions"
  }
];

const styles = {
    container: {
        border: "solid",
        borderWidth: 1,
        borderRadius: 4,
        overflowY: "scroll",
        height: 300,
        justifyContent: 'space-around'
      }
} as React.CSSProperties;
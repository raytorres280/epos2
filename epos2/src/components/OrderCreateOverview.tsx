import * as React from "react";
import { Modal, Table, Card } from "antd";

export interface OverViewProps {}

export default props => {
  let { showing, cart, customerId, toggleSelf } = props;

  return (
    <Modal
      title="Basic Modal"
      visible={showing}
      // onOk={this.handleOk}
      onCancel={() => toggleSelf()}
    >
      <Card
        title={customerId}
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>address and stuff later</p>
      </Card>
      <Table pagination={false} columns={columns} dataSource={cart} />
    </Modal>
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
    title: "special instructions",
    dataIndex: "instructions",
    key: "instructions"
  }
];

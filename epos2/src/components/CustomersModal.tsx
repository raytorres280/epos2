import * as React from "react";
import { Modal, List } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
// import Customers from "./Customers";

export interface ModalProps {
  selectCustomer: Function;
  showing: boolean;
}

class CustomersModal extends React.Component<ModalProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCustomer: {},
      customers: [1, 2, 3], // do a graphql query to get these
      loading: true
    };
  }

  componentWillReceiveProps(newProps: ModalProps) {
      if (newProps.data.customers !== this.props.data.customers) {
          this.setState({ customers: newProps.data.customers })
      }
  }
  render() {
    let { customers, loading } = this.state;
    let { showing } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={showing}
        // onOk={this.handleOk}
        onCancel={() => this.setState({ customersVisible: false })}
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={customers}
          renderItem={item => (
            <List.Item actions={<Button onClick={() => this.selectCustomer()}>Select</Button>}>
              <List.Item.Meta
                title={item.first + ' ' + item.last}
                description={`member since: insert years here`}
              />
              {/* <div>content</div> */}
            </List.Item>
          )}
        />
      </Modal>
    );
  }
}

const query = gql`
    query {
        customers {
            id
            first
            last
        }
    }
`
export default graphql(query)(CustomersModal);

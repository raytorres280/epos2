import * as React from "react";
import { Modal, List, Button } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
// import Customers from "./Customers";

export interface ModalProps {
  selectCustomer: Function;
  toggleSelf: Function;
  showing: boolean;
  data?: any;
}
export interface ModalState {
    selectedCustomer: object;
    customers: object[];
    showing: boolean;
    loading: boolean;
    data?: any;
  }

interface CustomerData {
    id: string;
    first: string;
    last: string;
}

class CustomersModal extends React.Component<any, any> {
  constructor(props: ModalProps) {
    super(props);
    console.log(props)
    this.state = {
      selectedCustomer: {},
      customers: [], // do a graphql query to get these
    };
  }
  handleSelection(customer: CustomerData) {
      console.log('selecting cust, closing modal, showing overview')
      this.props.selectCustomer(customer.id)
  }
  render() {
    let customers: CustomerData[] = this.props.data.customers || []
    // let { loading } = this.state;
    let { showing, toggleSelf } = this.props;
    // let customers = this.state.customers
    
    return (
      <Modal
        title="Basic Modal"
        visible={showing}
        // onOk={this.handleOk}
        onCancel={() => toggleSelf()}
      >
        <List
          loading={this.props.data.loading}
          itemLayout="horizontal"
          dataSource={customers}
          renderItem={item => (
            <List.Item
              actions={[
                <Button key={1} onClick={() => this.handleSelection(item)}>
                  Select
                </Button>
              ]}
            >
              <List.Item.Meta
                title={item.first + " " + item.last}
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
`;

export default graphql<any, any>(query)(CustomersModal);

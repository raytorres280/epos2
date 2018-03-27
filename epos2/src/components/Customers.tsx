import * as React from "react";
import { Table, Button } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import CustomerForm from "./CustomerForm";

export interface AppProps {}

class Customers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      loadMore: false,
      columns: [{}],
      showCustomerForm: false,
      selectedCustomerForEdit: {}
    };
    this.toggleCustomerForm = this.toggleCustomerForm.bind(this);
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.data.customers && newProps.data.customers.length > 1) {
      let keys = Object.keys(newProps.data.customers[0]).filter(
        key => key !== "__typename"
      );
      let cols = keys.map(name => ({
        title: name,
        dataIndex: name,
        key: name
      }));
      this.setState({
        columns: cols,
        customers: newProps.data.customers
      });
    }
  }
  toggleCustomerForm() {
    this.setState({ showCustomerForm: !this.state.showCustomerForm, selectedCustomerForEdit: {} });
  }
  render() {
    let { customers } = this.props.data
    return (
      <div>
        <Table
          columns={this.state.columns}
          rowKey="id"
          expandedRowRender={customer => (
            <div>
              <p style={{ margin: 0 }}>
                {customer.first} {customer.last}
              </p>
              <Button
                onClick={() =>
                  this.setState({
                    selectedCustomerForEdit: customer,
                    showCustomerForm: true
                  })
                }
              >
                Edit
              </Button>
            </div>
          )}
          dataSource={customers}
          pagination={false}
        />
        <Button
          icon="plus"
          type="primary"
          onClick={() => this.setState({ showCustomerForm: true })}
        />
          <CustomerForm
            visible={this.state.showCustomerForm}
            toggleCustomerForm={this.toggleCustomerForm}
            customer={this.state.selectedCustomerForEdit}
          />
      </div>
    );
  }
}

const query = gql`
  query {
    customers {
      id
      first
      last
      street
      city
      state
      zip
    }
  }
`;

export default graphql(query)(Customers);

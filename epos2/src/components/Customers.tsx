import * as React from "react";
import { Table } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export interface AppProps {}

class Customers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      loadMore: false,
      columns: [{}],
      customers: [{}]
    };
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.data.customers && newProps.data.customers.length > 1) {
      let keys = Object.keys(newProps.data.customers[0]).filter(key => key !== '__typename')
      let cols = keys.map(name => ({ title: name, dataIndex: name, key: name }))
      this.setState({
        columns: cols,
        customers: newProps.data.customers
      })
    }
  }

  render() {
    return (
      <Table
        columns={this.state.columns}
        expandedRowRender={() => (
          <p style={{ margin: 0 }}>hello world</p>
        )}
        dataSource={this.state.customers}
      />
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

export default graphql(query)(Customers)
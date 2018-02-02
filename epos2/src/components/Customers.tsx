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
      columns: [],
      customers: []
    };
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.data.customers) {
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
        // expandedRowRender={record => (
        //   <p style={{ margin: 0 }}>{record.first}</p>
        // )}
        dataSource={this.state.customers}
      />
    );
  }
}

const query = gql`
  {
    customers {
      first
      last
    }
  }
`

export default graphql(query)(Customers)

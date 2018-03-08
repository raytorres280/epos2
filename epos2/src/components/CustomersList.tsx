import * as React from "react";
import { List, Button } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import InfiniteScroll from "react-infinite-scroller";

interface CustomerData {
  id: string;
  first: string;
  last: string;
}

const CustomersList = props => {
  // constructor(props: any) {
  //   super(props);
  //   console.log(props)
  //   this.state = {
  //     selectedCustomer: {},
  //     customers: [], // do a graphql query to get these
  //   };
  // }
  // handleSelection(customer: CustomerData) {
  //     console.log('selecting cust, closing modal, showing overview')
  //     this.props.selectCustomer(customer.id)
  // }
  let { selectCustomer } = props;
  let customers: CustomerData[] = props.data.customers || [];
  // let { loading } = this.state;
  // let { showing, toggleSelf } = this.props;
  // let customers = this.state.customers

  // add search field to this later, maybe pagination?
  return (
    <div style={styles.container}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={() => console.log("trying to load more data for list")}
        hasMore={false}
        useWindow={false}
      >
        <List
          loading={props.data.loading}
          itemLayout="horizontal"
          dataSource={customers}
          renderItem={item => (
            <List.Item
              actions={[
                <Button key={1} onClick={() => selectCustomer(item)}>
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
      </InfiniteScroll>
    </div>
  );
};

const query = gql`
  query {
    customers {
      id
      first
      last
    }
  }
`;

export default graphql<any, any>(query)(CustomersList);

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

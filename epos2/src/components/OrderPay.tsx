import * as React from 'react';

export interface AppProps {
}

export default class App extends React.Component<AppProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {

    }
    console.log(props.match)
  }
  render() {
    return (
      <div>
        hello
      </div>
    );
  }
}

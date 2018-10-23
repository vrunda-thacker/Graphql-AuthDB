import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


export default (WrappedComponent) => {
class RequireAuth extends Component {

  componentWillUpdate(nextProps) {
    console.log(this.props.data);
    if(!nextProps.data.loading && !nextProps.data.user) {
      hashHistory.push('/login');
    }
  }

  render() {
    return <WrappedComponent {...this.props} />
  }
}

return graphql(CurrentUser)(RequireAuth);
};

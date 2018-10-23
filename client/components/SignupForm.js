import React, { Component } from 'react';
import AuthForm from './AuthForm';
import  { graphql } from 'react-apollo';
import SignupUser from '../mutations/SignupUser';
import CurrentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  componentWillUpdate(nextProps) {
    if(!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password}) {
      this.props.mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query: CurrentUser}]
      }).catch(rsp => {
        const errors = rsp && rsp.graphQLErrors.map(err => err.message)
        this.setState({
          errors
        })
      });
  }

  render() {
    return (
      <div>
        <h3> Sign Up</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }

}

export default graphql(CurrentUser)(
graphql(SignupUser)(SignupForm));

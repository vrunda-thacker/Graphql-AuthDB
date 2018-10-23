import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUser from '../queries/CurrentUser';
import { Link } from 'react-router';
import LogoutUser from '../mutations/LogoutUser';

class Header extends Component {

onLogout() {
  this.props.mutate({
    refetchQueries: [{
      query: CurrentUser
    }]
  })

}

renderButtons() {
  const { loading, user } = this.props.data;
  if(loading) {
    return (<div>Loading...</div>);
  }
  if (user) {
    return (
      <li>
        <a onClick={this.onLogout.bind(this)}>Logout</a>
      </li>
    );
  } else {
    return (
      <div>
        <li>
          <Link to='/singup'>Sign Up</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </div>
    );
  }
}

render() {
  const { loading, user } = this.props.data;
  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo left'>Home</Link>
        <ul className='right'>
          {this.renderButtons()}
        </ul>
      </div>
    </nav>
  );
}

}

export default graphql(LogoutUser)(
  graphql(CurrentUser)(Header));

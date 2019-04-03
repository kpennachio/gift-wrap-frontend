import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import Checklist from './Checklist'
import SideNav from './SideNav'
import Header from './Header'



class App extends Component {


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      this.props.getUsers(users)
      this.props.getCurrentUser(users[0])
    })
  }

  render() {
    return (
      <div>
        <Header/>
        <SideNav/>
        <Switch>
          <Route path="/checklist" component={ Checklist }/>
          <Route path="/dashboard" component={ Dashboard }/>
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: (users) => dispatch({type: "GET_USERS", payload: users}),
    getCurrentUser: (user) => dispatch({type: "GET_CURRENT_USER", payload: user})
  }
}

export default connect(null, mapDispatchToProps)(App);


// <Route path="/event/:id" component={(props) => <UserContainer {...props}/>}/>

import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import EventPage from './EventPage'



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
      <div className="App">
        <Switch>
          <Route path="/events" component={(props) => <EventPage {...props} />}/>
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

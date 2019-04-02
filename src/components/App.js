import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'



class App extends Component {


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      this.props.getUsers(users)
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/events" component={(props) => <EventContainer {...props} />}/>
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: (users) => dispatch({type: "GET_USERS", payload: users})
  }
}

export default connect(null, mapDispatchToProps)(App);


// <Route path="/event/:id" component={(props) => <UserContainer {...props}/>}/>

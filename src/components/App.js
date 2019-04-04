import React, { Component, Fragment } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import Checklist from './Checklist'
import SideNav from './SideNav'
import Header from './Header'
import Dashboard from './Dashboard'




class App extends Component {


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/6')
    .then(resp => resp.json())
    .then(user => {
      this.props.getCurrentUser(user)
    })
  }

  render() {
    return (
      <Fragment >

        <Header />
        <div className="gift-planner-wrapper">
          <div className="side-nav">
            <SideNav/>
          </div>
          <div className="planner-content">
            <Switch>
              <Route path="/checklist" component={ Checklist }/>
              <Route path="/dashboard" component={ Dashboard }/>
            </Switch>
          </div>
        </div>
      </Fragment >
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


// return (
//   <Fragment >
//   <Container>
//     <Header />
//   </Container>
//   <Container >
//     <Grid columns="two">
//       <Grid.Column width={2}>
//         <SideNav/>
//       </Grid.Column>
//       <Grid.Column >
//         <Switch>
//           <Route path="/checklist" component={ Checklist }/>
//           <Route path="/dashboard" component={ Dashboard }/>
//         </Switch>
//       </Grid.Column>
//     </Grid>
//   </ Container>
//   </Fragment >
// );

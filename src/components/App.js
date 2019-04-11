import React, { Component, Fragment } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import Checklist from './Checklist'
import SideNav from './SideNav'
import Header from './Header'
import Dashboard from './Dashboard'
import PeoplePage from './PeoplePage'
import GiftPage from './GiftPage'
import Budgeter from './Budgeter'
import ChecklistDetail from './event_show_page/ChecklistDetail'
import Person from './person_show_page/Person'
import Gift from './gift_show_page/Gift'
import Login from './Login'
import Profile from './Profile'
import CreateAccount from './CreateAccount'




class App extends Component {


  componentDidMount() {
    let year = new Date().getFullYear()
    this.props.setYear(year)

    const jwt = localStorage.getItem('jwt')

		if (jwt){
			fetch("http://localhost:3000/api/v1/auto_login", {
				headers: {
					"Authorization": jwt
				}
			})
				.then(res => res.json())
				.then((response) => {
					if (response.errors) {
						alert(response.errors)
					} else {
            localStorage.setItem("token", response.jwt)
            this.setCurrentUserInfo(response.id)
					}
				})
		}
  }

  setCurrentUserInfo = (userId) => {
      fetch(`${this.props.url}/users/${userId}`)
      .then(resp => resp.json())
      .then(user => {
        this.props.getCurrentUser(user)
        this.props.setEvents(user.events)
        this.props.setPeople(user.people)
        this.props.setGifts(user.gifts)
        this.props.setBudgets(user.budgets)
        let budget = user.budgets.find(budget => budget.year === 2019)
        if (budget) {
          this.props.setBudget(budget)
        }
    })
  }





	logout = () => {
		localStorage.removeItem("token")
    this.props.getCurrentUser({})
    this.props.setEvents([])
    this.props.setPeople([])
    this.props.setGifts([])
    this.props.setBudgets([])
    this.props.setBudget({})
		this.props.history.push("/login")
	}






  render() {
    return (
      <Fragment >

        <Header logout={this.logout}/>
          <div className="side-nav">
            <SideNav />
          </div>
          <div className="planner-content">
            <Switch>
              <Route path="/login" render={routerProps => <Login {...routerProps}  setCurrentUserInfo={this.setCurrentUserInfo} />} />
              <Route path="/account" render={ (props) => <Profile {...props} /> } />
              <Route path="/create-account" render={ (props) => <CreateAccount {...props} /> } />
              <Route path="/checklist/:id" render={ (props) => <ChecklistDetail {...props} /> } />
              <Route path="/checklist" component={ Checklist }/>
              <Route path="/dashboard" component={ Dashboard }/>
              <Route path="/budgeter" component={ Budgeter }/>
              <Route path="/my-people/:id" render={ (props) => <Person {...props }/> } />
              <Route path="/my-people" component={ PeoplePage }/>
              <Route path="/my-gifts/:id" render={ (props) => <Gift {...props}/> }/>
              <Route path="/my-gifts" component={ GiftPage }/>
            </Switch>
          </div>
      </Fragment >
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: (users) => dispatch({type: "GET_USERS", payload: users}),
    getCurrentUser: (user) => dispatch({type: "GET_CURRENT_USER", payload: user}),
    setEvents: (events) => dispatch({type: "SET_EVENTS", payload: events}),
    setPeople: (people) => dispatch({type: "SET_PEOPLE", payload: people}),
    setGifts: (gifts) => dispatch({type: "SET_GIFTS", payload: gifts}),
    setBudgets: (budgets) => dispatch({type: "SET_BUDGETS", payload: budgets}),
    setBudget: (budget) => dispatch({type: "SET_BUDGET", payload: budget}),
    setYear: (year) => dispatch({type: "SET_YEAR", payload: year})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

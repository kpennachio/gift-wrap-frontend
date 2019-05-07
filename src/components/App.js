import React, { Component, Fragment } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import Checklist from './Checklist'
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
import NotFound from './NotFound'


class App extends Component {


  componentDidMount() {
    // find current year and set in state
    let year = new Date().getFullYear()
    this.props.setYear(year)

    const jwt = localStorage.getItem('jwt')

    // auto login for app if jwt exists
		if (jwt){
			fetch(`${this.props.url}/auto_login`, {
				headers: {
					"Authorization": jwt
				}
			})
				.then(res => res.json())
				.then((response) => {
					if (response.errors) {
						alert(response.errors)
					} else {
            this.setCurrentUserInfo(response.id)
					}
				})
		}
  }

  // for current user, set events, people, gifts, budgets, email reminder in state
  setCurrentUserInfo = (userId) => {
      fetch(`${this.props.url}/users/${userId}`)
      .then(resp => resp.json())
      .then(user => {
        this.props.getCurrentUser(user)
        this.props.setEvents(user.events)
        this.props.setPeople(user.people)
        this.props.setGifts(user.gifts)
        this.props.setBudgets(user.budgets)
        this.props.setEmailReminder(user.email_reminder)
        let budget = user.budgets.find(budget => budget.year === 2019)
        if (budget) {
          this.props.setBudget(budget)
        }
    })
  }

  // on logout button click, remove jwt and clear state, redirect to login page
	logout = () => {
		localStorage.removeItem("jwt")
    this.props.getCurrentUser({})
    this.props.setEvents([])
    this.props.setPeople([])
    this.props.setGifts([])
    this.props.setBudgets([])
    this.props.setBudget({})
    this.props.setEmailReminder("")
		this.props.history.push("/login")
	}

  // route options depending on if there is a logged in user
  // if not logged in, can only visit login or create account routes
  renderLoggedIn = () => {
    if (localStorage.getItem('jwt')) {
      return (
        <Fragment>

          <Switch>
            <Route path="/" exact render={ (props) => <Dashboard {...props} logout={this.logout} /> } />
            <Route path="/login" render={routerProps => <Login {...routerProps}  setCurrentUserInfo={this.setCurrentUserInfo} />} />
            <Route path="/account" render={ (props) => <Profile {...props} logout={this.logout} /> } />
            <Route path="/checklist/:id" render={ (props) => <ChecklistDetail {...props} logout={this.logout} /> } />
            <Route path="/checklist" exact render={ (props) => <Checklist {...props} logout={this.logout} /> } />
            <Route path="/dashboard" render={ (props) => <Dashboard {...props} logout={this.logout} /> } />
            <Route path="/budgeter" render={ (props) => <Budgeter {...props} logout={this.logout} /> } />
            <Route path="/my-people/:id" render={ (props) => <Person {...props } logout={this.logout}/> } />
            <Route path="/my-people" exact render={ (props) => <PeoplePage {...props } logout={this.logout}/> } />
            <Route path="/my-gifts/:id" render={ (props) => <Gift {...props} logout={this.logout}/> }/>
            <Route path="/my-gifts" exact render={ (props) => <GiftPage {...props } logout={this.logout}/> } />
            <Route render={ (props) => <NotFound {...props } logout={this.logout}/> } />/>
          </Switch>

        </Fragment>
      )
    }
    else {
      return (
        <Switch>
          <Route path="/login" render={routerProps => <Login {...routerProps}  setCurrentUserInfo={this.setCurrentUserInfo} />} />
          <Route path="/create-account" render={ (props) => <CreateAccount {...props} /> } />
          <Route path="/" render={routerProps => <Login {...routerProps}  setCurrentUserInfo={this.setCurrentUserInfo} />} />
        </Switch>
      )
    }
  }


  render() {
    return (
      <div id="app">
        {this.renderLoggedIn()}
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id,
    url: state.url,
    gifts: state.gifts,
    events: state.events,
    people: state.people
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
    setYear: (year) => dispatch({type: "SET_YEAR", payload: year}),
    setEmailReminder: (reminder) => dispatch({type: "SET_EMAIL_REMINDER", payload: reminder})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

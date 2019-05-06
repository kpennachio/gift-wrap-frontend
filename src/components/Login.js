import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

// Login page

class Login extends Component {

  state = {
    username: "",
    password:  "",
    message: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // On submit, check username and password on the backend
  handleSubmit = (e) => {
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    fetch(`${this.props.url}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then((response) => {
      // display any errors
			if (response.errors) {
				this.setState({
          message: response.errors,
          username: "",
          password: ""
        })
			} else {
        // or set jwt token in local storage and current user info in state
        // redirect to dashboard page
          localStorage.setItem('jwt', response.jwt)
          this.props.setCurrentUserInfo(response.user.id)
          this.props.history.push(`/dashboard`)
				}
			})
  }

  // If user goes to "/login" and is already logged in, redirect to dashboard
  render() {
    if (localStorage.getItem('jwt')) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Fragment>
      <div id="login-page">
        <div className="main-logo">Gift Wrap</div>
        <div id="login-container" className="centered">
          <h1>Login</h1>
          <div>
            <Link to="/create-account">or Create Account</Link>
          </div>
            <p>{this.state.message}</p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field control={Input} value={this.state.username} name="username" label='Username' placeholder='Username' onChange={this.handleChange} />
              <Form.Field control={Input} type="Password" value={this.state.password} name="password" label='Password' placeholder='Password' onChange={this.handleChange} />
              <Button
                type='submit'
                disabled={this.state.username === "" || this.state.password === ""}
                >
                Login
              </Button>
            </Form>

        </div>
        <p id="photo-credit">Photo by Debby Hudson on Unsplash</p>

      </div>
      </Fragment>
    )
  }

}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

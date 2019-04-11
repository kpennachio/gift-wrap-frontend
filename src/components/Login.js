import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'


class Login extends Component {

  state = {
    username: "",
    password:  "",
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    fetch("http://localhost:3000/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors) {
				alert(response.errors)
			} else {
          localStorage.setItem('jwt', response.jwt)
          this.props.setCurrentUserInfo(response.user.id)
          this.props.history.push(`/dashboard`)

				}
			})
  }


  render() {
    if (localStorage.getItem('jwt')) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div id="login-container">
        <h1>Login</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field control={Input} value={this.state.username} name="username" label='Username' placeholder='Username' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.password} name="password" label='Password' placeholder='Password' onChange={this.handleChange} />
            <Button type='submit'>Login</Button>
          </Form>
          <div>
            <Link to="/create-account">Create Account</Link>
          </div>
      </div>
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

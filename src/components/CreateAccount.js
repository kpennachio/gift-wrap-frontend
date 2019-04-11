import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Form, Input, Button } from 'semantic-ui-react'



class CreateAccount extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name:  "",
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    console.log("submit", this.state);
    e.preventDefault()
    fetch(`${this.props.url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(user => {
      console.log(user)
      this.props.history.push(`/login`)

    })
  }

  render() {
    return (
      <div id="create-account-form" className="centered">
        <h1>Create Account</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field control={Input} value={this.state.username} name="username" label='Username' placeholder='Username' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.password} name="password" label='Password' placeholder='Password' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.email} name="email" label='Email' placeholder='Email' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.first_name} name="first_name" label='First Name' placeholder='First Name' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.last_name} name="last_name" label='Last Name' placeholder='Last Name' onChange={this.handleChange} />

            <Button type='submit'>Create Account</Button>
          </Form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    url: state.url
  }
}


export default connect(mapStateToProps)(CreateAccount);

import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



export default class Login extends Component {

  state = {
    first_name: "",
    last_name:  "",
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
          <Form>
            <Form.Field control={Input} value={this.state.first_name} name="username" label='Username' placeholder='Username' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.last_name} name="password" label='Password' placeholder='Password' onChange={this.handleChange} />
            <Button type='submit'>Login</Button>
          </Form>
          <div>
            <Link to="/create-account">Create Account</Link>
          </div>
      </div>
    )
  }

}

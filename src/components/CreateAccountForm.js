import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'



export default class CreateAccountForm extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name:  "",
  }

  render() {
    return (
      <div>
        <h1>Create Account</h1>
          <Form>
            <Form.Field control={Input} value={this.state.first_name} name="username" label='Username' placeholder='Username' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.last_name} name="password" label='Password' placeholder='Password' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.first_name} name="email" label='Email' placeholder='Email' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.last_name} name="first_name" label='First Name' placeholder='First Name' onChange={this.handleChange} />
            <Form.Field control={Input} value={this.state.last_name} name="last_name" label='Last Name' placeholder='Last Name' onChange={this.handleChange} />

            <Button type='submit'>Create Account</Button>
          </Form>
      </div>
    )
  }

}

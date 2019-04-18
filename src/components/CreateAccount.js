import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { Form, Input, Button } from 'semantic-ui-react'



class CreateAccount extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name:  "",
    messages: [],
    form: {display: "block"},
    link: {display: "none"}
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name:  this.state.last_name,
    }
    fetch(`${this.props.url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        this.setState({
          messages: response.errors
        })
      }
      else {
        this.setState({
          messages: ["^Success! Continue to login..."],
          form: {display: "none"},
          link: {display: "block"}
        })
      }
    })
  }

  displayMessages = () => {
    return this.state.messages.map(message => {
      return <p>{message.split('^')[1]}</p>
    })
  }

  render() {
    return (
      <div>
        <div className="main-logo">Gift Wrap</div>

      <div>
      <div className="centered">
        {this.displayMessages()}
        <div style={this.state.link}>
        <Link to="/login">Go to Login</Link>
      </div>
        </div>
        <div id="create-account-form" className="centered" style={this.state.form}>
          <Link to="/login">Return to Login</Link>
          <h1>Create Account</h1>
            <Form onSubmit={this.handleSubmit} >
              <Form.Field required control={Input} value={this.state.username} name="username" label='Username' placeholder='Username' onChange={this.handleChange} />

              <Form.Field required control={Input} type="Password" value={this.state.password} name="password" label='Password' placeholder='Password' onChange={this.handleChange} />

              <Form.Field required control={Input} value={this.state.email} name="email" label='Email' placeholder='Email' onChange={this.handleChange} />

              <Form.Field required control={Input} value={this.state.first_name} name="first_name" label='First Name' placeholder='First Name' onChange={this.handleChange} />

              <Form.Field required control={Input} value={this.state.last_name} name="last_name" label='Last Name' placeholder='Last Name' onChange={this.handleChange} />

              <Button
                type='submit'
                disabled={
                  this.state.username === ""
                  || this.state.password === ""
                  || this.state.email === ""
                  || this.state.first_name === ""
                  || this.state.last_name === ""
                }>
                Create Account
              </Button>
            </Form>
        </div>
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


export default connect(mapStateToProps)(CreateAccount);

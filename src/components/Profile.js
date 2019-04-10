import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Form, Input, Button } from 'semantic-ui-react'



class Profile extends Component {

  state = {
    first_name: this.props.currentUser.first_name,
    last_name:  this.props.currentUser.last_name,
  }



  // t.string "username"
  // t.string "password_digest"
  // t.string "first_name"
  // t.string "last_name"
  // t.string "email"

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <h1>Your Profile</h1>
        <Form>
          <Form.Field control={Input} value={this.state.first_name} name="first_name" label='First Name' placeholder='First Name' onChange={this.handleChange} />
          <Form.Field control={Input} value={this.state.last_name} name="last_name" label='Last Name' placeholder='Last Name' onChange={this.handleChange} />
          <Button type='submit'>Edit Person</Button>
        </Form>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Profile);

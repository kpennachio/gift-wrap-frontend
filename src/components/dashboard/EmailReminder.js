import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { Form, Radio } from 'semantic-ui-react'



class EmailReminder extends Component {


  handleChange = (e, { value }) => {
    this.props.setEmailReminder(value)
    this.updatePreference(value)
  }

  updatePreference = (value) => {
    let data = {
      email_reminder: value
    }
    fetch(`${this.props.url}/users/${this.props.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  render() {
    return (
      <div id="email-container">
      <h2 className="inline">Email Reminders</h2>
      <p>If you are missing a gift for an event, get an email reminder:</p>
      <Form>
        <Form.Field>
          <Radio
            label='Two weeks before'
            name='radioGroup'
            value={14}
            checked={this.props.emailReminder === 14}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='One week before'
            name='radioGroup'
            value={7}
            checked={this.props.emailReminder === 7}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='None'
            name='radioGroup'
            value={0}
            checked={this.props.emailReminder === 0}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
      </div>
    );

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    url: state.url,
    emailReminder: state.emailReminder
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEmailReminder: (reminder) => dispatch({type: "SET_EMAIL_REMINDER", payload: reminder})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailReminder);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { Form, Radio } from 'semantic-ui-react'



class EmailReminder extends Component {

  state = {
    emailReminder: 14
  }

  handleChange = (e, { value }) => {
    this.setState({ emailReminder: value })
    this.updatePreference(value)
  }

  updatePreference = (value) => {
    console.log(value);

  }

  render() {
    return (
      <div id="checklist-container">
      <h2 className="inline">Email Reminders</h2>
      <p>If you are missing a gift for an event, get an email reminder:</p>
      <Form>
        <Form.Field>
          <Radio
            label='Two weeks before'
            name='radioGroup'
            value={14}
            checked={this.state.emailReminder === 14}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='One week before'
            name='radioGroup'
            value={7}
            checked={this.state.emailReminder === 7}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='None'
            name='radioGroup'
            value={0}
            checked={this.state.emailReminder === 0}
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
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGift: (giftId) => dispatch({type: "DELETE_GIFT", payload: giftId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailReminder);

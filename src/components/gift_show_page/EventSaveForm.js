import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Button, Dropdown } from 'semantic-ui-react'


class EventSaveForm extends Component {

  state = {
    selections: []
  }

  eventOptions = () => {
    return this.props.events.map(event => {
      return {key: event.id, text: event.name, value: event.id}
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ selections: value })
  }

  handleSubmit = () => {

  }

  render() {
    console.log(this.state.selections);
    return (
      <div>
      <Dropdown
      placeholder='Event'
      fluid
      multiple
      search
      selection
      value={this.state.selections}
      options={this.eventOptions()}
      onChange={this.handleChange}
      />
      <Button onClick={this.handleSubmit}>Save</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    events: state.events
  }
}

export default connect(mapStateToProps)(EventSaveForm)

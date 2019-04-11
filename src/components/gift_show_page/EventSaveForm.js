import React, { Component } from 'react';
import { connect } from 'react-redux'

import { resetState } from '../../resetState'

import { Button, Dropdown, Card } from 'semantic-ui-react'


class EventSaveForm extends Component {

  state = {
    selections: []
  }

  eventOptions = () => {
    let events = this.props.events.filter(event => {
      return this.props.gift.event_gift_ideas.every(egi => {
        return egi.event_id !== event.id
      })
    })
    return events.map(event => {
      return {key: event.id, text: event.title, value: event.id}
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ selections: value })
  }

  handleSubmit = () => {
    this.state.selections.forEach(eventId => this.createNewEventGiftIdea(eventId))
  }

  createNewEventGiftIdea = (eventId) => {
    let data = {
      event_id: eventId,
      gift_idea_id: this.props.gift.id
    }
    fetch("http://localhost:3000/api/v1/event_gift_ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(egi => {
      this.setState({selections: []})
      this.props.addNewEventGiftIdea(egi)
      resetState(this.props.currentUser.id)
    })
  }

  deleteSavedEvent = (egi) => {
    fetch(`http://localhost:3000/api/v1/event_gift_ideas/${egi.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      this.props.deleteEventGiftIdea(egi)
      resetState(this.props.currentUser.id)
    })
  }

  renderSavedPeople = () => {
    return this.props.gift.event_gift_ideas.map(egi =>{
      let event = this.props.events.find(event => event.id === egi.event_id)
      return (
        <Card>
        {event.title}
        <p onClick={() => this.deleteSavedEvent(egi)}>X</p>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>
      {this.renderSavedPeople()}
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
    currentUser: state.currentUser,
    events: state.events,
    gifts: state.gifts
  }
}

// implement these to make appearance faster
function mapDispatchToProps(dispatch) {
  return{
    deleteEventGiftIdea: (egi) => {dispatch({type: "DELETE_EVENT_GIFT_IDEA_FROM_GIFT", payload: egi } )},
    addNewEventGiftIdea: (egi) => {dispatch({type: "ADD_NEW_EVENT_GIFT_IDEA_FROM_GIFT", payload: egi } )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSaveForm)

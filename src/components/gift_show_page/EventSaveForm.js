import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { resetState } from '../../resetState'

import { Button, Dropdown, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


// Gift show page: save gift to events

class EventSaveForm extends Component {

  state = {
    selections: []
  }

  // Populate dropdown form with events not already saved to gift
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

  // Add selected events to state
  handleChange = (e, { value }) => {
    this.setState({ selections: value })
  }

  // On submit, save gift as idea for events
  // Create new EventGiftIdea (join class for event and gift)
  handleSubmit = () => {
    this.state.selections.forEach(eventId => this.createNewEventGiftIdea(eventId))
  }

  createNewEventGiftIdea = (eventId) => {
    let data = {
      event_id: eventId,
      gift_idea_id: this.props.gift.id
    }
    fetch(`${this.props.url}/event_gift_ideas`, {
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

  // On click of heart, remove gift idea from event
  // Delete EventGiftIdea
  deleteSavedEvent = (egi) => {
    fetch(`${this.props.url}/event_gift_ideas/${egi.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      this.props.deleteEventGiftIdea(egi)
      resetState(this.props.currentUser.id)
    })
  }

  // Show all events that have this gift saved
  renderSavedEvents = () => {
    return this.props.gift.event_gift_ideas.map(egi =>{
      let event = this.props.events.find(event => event.id === egi.event_id)
      return (
        <Card className="save-card" key={uuid()}>
          <Card.Content className="inline">
            <Link to={`/checklist/${event.id}`} className="inline">{event.title}</Link>
            <Icon size="large" name="heart" onClick={() => this.deleteSavedEvent(egi)} />
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>
      <Dropdown
      placeholder='Event'
      multiple
      search
      selection
      value={this.state.selections}
      options={this.eventOptions()}
      onChange={this.handleChange}
      />
      <Button onClick={this.handleSubmit}>Save</Button>
      <div className="saved-people">
        {this.renderSavedEvents()}
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    currentUser: state.currentUser,
    events: state.events,
    gifts: state.gifts,
    url: state.url
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

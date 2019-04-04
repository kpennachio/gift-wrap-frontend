import React from 'react';
import { connect } from 'react-redux'

import Event from './Event'
import EventForm from './EventForm'




const EventContainer = (props) => {
  const { events } = props



  const orderEvents = () => {
    if (events) {
      return events.sort((a, b) => {
        return new Date(a.dateFormatted) - new Date(b.dateFormatted)
      })
    }
  }

  const renderAllEvents = () => {
    if (events) {
      return orderEvents().map(event => <Event key={event.id} event={event}/>)
    }
  }

  return (
    <div>

      <EventForm />
      <h2>all events</h2>
      {renderAllEvents()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    events: state.currentUser.events
  }
}

export default connect(mapStateToProps)(EventContainer);

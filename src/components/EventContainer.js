import React from 'react';
import { connect } from 'react-redux'

import Event from './Event'
import EventForm from './EventForm'




const EventContainer = (props) => {
  const { events } = props

  console.log("event container props", props);


  const orderEvents = () => {
    if (events) {
      return events.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
    }
  }

  const renderAllEvents = () => {
    if (events) {
      return orderEvents().map(event => <Event event={event}/>)
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

import React from 'react';
import { connect } from 'react-redux'

import Event from './Event'



const EventContainer = ({events}) => {

  console.log(events);

  const renderAllEvents = () => {
    if (events) {
      return events.map(event => <Event event={event}/>)
    }
  }

  return (
    <div>
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

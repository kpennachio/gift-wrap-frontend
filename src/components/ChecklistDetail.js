import React from 'react';
import { connect } from 'react-redux'

import EventDetail from './EventDetail'



const ChecklistDetail = (props) => {

  const returnEvent = () => {
    if (props.events.length > 0) {
      let event = props.events.find(event => event.id === parseInt(props.match.params.id))
      return < EventDetail event={event} />
    }
  }

  return (
    <div>
      <h1>My Event</h1>
      {returnEvent()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    events: state.events
  }
}

export default connect(mapStateToProps)(ChecklistDetail);

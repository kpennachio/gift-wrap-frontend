import React from 'react';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'


const EventPage = (props) => {

  console.log("event container", props.currentUser);
  return (
    <div>
      <h1>My Events</h1>
      < EventContainer />
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventPage);

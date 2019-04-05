import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const EventDetail = ({event}) => {

  console.log("reached EventDetail");

  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.dateFormatted}</p>
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventDetail);

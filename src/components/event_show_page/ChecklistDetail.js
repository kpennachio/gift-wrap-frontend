import React from 'react';
import { connect } from 'react-redux'

import EventDetail from './EventDetail'

// Event show page - renders EventDetail

const ChecklistDetail = (props) => {

  // find event from url
  const returnEvent = () => {
    if (props.events.length > 0) {
      let event = props.events.find(event => event.id === parseInt(props.match.params.id))
      return < EventDetail event={event} history={props.history} logout={props.logout}/>
    }
  }

  return (
    <div>
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

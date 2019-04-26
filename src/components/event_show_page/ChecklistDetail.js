import React from 'react';
import { connect } from 'react-redux'

import EventDetail from './EventDetail'



const ChecklistDetail = (props) => {

  const returnEvent = () => {
    if (props.events.length > 0) {
      return < EventDetail event={props.event} history={props.history} logout={props.logout}/>
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

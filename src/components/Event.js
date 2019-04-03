import React from 'react';
import { connect } from 'react-redux'





const Event = ({event}) => {


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

export default connect(mapStateToProps)(Event);

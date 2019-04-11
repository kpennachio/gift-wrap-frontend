import React from 'react';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'
import SideNav from './SideNav'



const Checklist = (props) => {

  return (
    <div>
      <SideNav />
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

export default connect(mapStateToProps)(Checklist);

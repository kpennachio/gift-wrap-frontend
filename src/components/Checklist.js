import React, { Component } from 'react';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'
import SideNav from './SideNav'

import { Checkbox } from 'semantic-ui-react'



class Checklist extends Component {

  state = {
    showAllEvents: false
  }

  toggleEvents = () => {
    this.setState((prevState) => ({
      showAllEvents: !prevState.showAllEvents
    }))
  }

  render() {
    return (
      <div>
      <SideNav />
      <h1>My Events</h1>
      <Checkbox onChange={this.toggleEvents} toggle label="Show Completed Events" />
      <EventContainer showAllEvents={this.state.showAllEvents}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Checklist);

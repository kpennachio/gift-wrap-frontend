import React, { Component } from 'react';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'
import SideNav from './SideNav'
import EventForm from './EventForm'

import { Checkbox, Sidebar, Button, Segment, Menu } from 'semantic-ui-react'



class Checklist extends Component {

  state = {
    showAllEvents: false,
    showForm: false
  }

  toggleEvents = () => {
    this.setState((prevState) => ({
      showAllEvents: !prevState.showAllEvents
    }))
  }

  showForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm
    }))
  }

  render() {
    return (
      <div>
      <SideNav />
      <Sidebar.Pushable >
        <Sidebar
        as={Menu}
        animation="overlay"
        vertical
        visible={this.state.showForm}
        direction="right"
        >
          <EventForm />
        </Sidebar>
        <Sidebar.Pusher dimmed={this.state.showForm}>

            <h1>My Events</h1>
            <Checkbox onChange={this.toggleEvents} toggle label="Show Completed Events" />
            <Button onClick={this.showForm}>Add Event</Button>
            <EventContainer showAllEvents={this.state.showAllEvents}/>

        </Sidebar.Pusher>
      </Sidebar.Pushable>
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

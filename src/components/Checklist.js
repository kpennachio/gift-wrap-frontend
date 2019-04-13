import React, { Component } from 'react';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'
import SideNav from './SideNav'
import EventForm from './EventForm'
import Header from './Header'


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
    this.setState({showForm: true})

  }

  handleSidebarHide = () => {
    this.setState({showForm: false})
  }

  render() {
    return (
      <div>

      <Sidebar.Pushable >
        <Sidebar
        as={Menu}
        animation="overlay"
        vertical
        visible={this.state.showForm}
        direction="right"
        width="very wide"
        className="form"
        onHide={this.handleSidebarHide}
        >
          <EventForm />
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.showForm} >
          <Header logout={this.props.logout}/>
          <SideNav />
          <div className="planner-content">
            <h1>My Events</h1>
            <Checkbox onChange={this.toggleEvents} toggle label="Show Completed Events" />
            <Button onClick={this.showForm}>Add Event</Button>
            <EventContainer showAllEvents={this.state.showAllEvents}/>
          </div>
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

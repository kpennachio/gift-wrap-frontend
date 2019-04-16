import React, { Component } from 'react';
import { connect } from 'react-redux'

import EventContainer from './EventContainer'
import SideNav from './SideNav'
import EventForm from './EventForm'
import AppHeader from './AppHeader'


import { Checkbox, Sidebar, Button, Menu } from 'semantic-ui-react'



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
          <EventForm handleSidebarHide={this.handleSidebarHide}/>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.showForm} >
          <AppHeader logout={this.props.logout}/>
          <SideNav />
          <div id="checklist-header">
            <h1 className="inline">Event Checklist</h1>
            <Button id="add-event-button" onClick={this.showForm}>Add Event</Button>
          </div>
          <div className="checklist-content">
            <Checkbox onChange={this.toggleEvents} toggle label="Show Completed Events" />
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

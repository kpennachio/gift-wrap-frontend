import React, { Component } from 'react';
import { connect } from 'react-redux'

import PersonCard from './PersonCard'
import PersonForm from './PersonForm'
import SideNav from './SideNav'
import AppHeader from './AppHeader'

import { Sidebar, Button, Menu } from 'semantic-ui-react'


import uuid from 'uuid'

// My people page - people index

class PeoplePage extends Component {

  state = {
    showForm: false
  }

  // order people alphabetically and render PersonCard for each
  renderAllPeople = () => {
    let orderedPeople = this.props.people.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    return orderedPeople.map(person => {
      return <PersonCard key={uuid()} person={person} />
    })
  }

  // Show new person form
  showForm = () => {
    this.setState({showForm: true})

  }

  // Hide new person form
  handleSidebarHide = () => {
    this.setState({showForm: false})
  }

  render() {
    return (
      <div>
      <Sidebar.Pushable>
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
      <PersonForm />
      </Sidebar>

      <Sidebar.Pusher dimmed={this.state.showForm} >
        <AppHeader logout={this.props.logout}/>
        <SideNav />
        <div id="people-header">
        <h1 className="inline">My People</h1>
        <Button id="add-person-button" onClick={this.showForm}>Add a Person</Button>
        </div>
        <div className="people-content">
        {this.renderAllPeople()}
        </div>
      </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    );

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people
  }
}

export default connect(mapStateToProps)(PeoplePage);

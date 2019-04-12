import React, { Component } from 'react';
import { connect } from 'react-redux'

import PersonCard from './PersonCard'
import PersonForm from './PersonForm'
import SideNav from './SideNav'
import Header from './Header'

import { Checkbox, Sidebar, Button, Segment, Menu } from 'semantic-ui-react'


import uuid from 'uuid'


class PeoplePage extends Component {

  state = {
    showForm: false
  }

  renderAllPeople = () => {
    return this.props.people.map(person => {
      return <PersonCard key={uuid()} person={person} />
    })
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
        <Header logout={this.props.logout}/>
        <SideNav />
        <div className="planner-content">
        <h1>My People Page</h1>
        <Button onClick={this.showForm}>Add a Person</Button>
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

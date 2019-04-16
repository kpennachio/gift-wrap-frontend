import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import PersonSavedGift from '../person_show_page/PersonSavedGift'
import EventCard from './EventCard'
import EditPersonForm from './EditPersonForm'
import SideNav from '../SideNav'
import AppHeader from '../AppHeader'

import { Button, Sidebar, Menu } from 'semantic-ui-react'

import { resetState } from '../../resetState'


class PersonDetail extends Component {


  state = {
    showForm: false,
    formMessage: ""
  }

  renderPersonGiftIdeas = () => {
      return this.props.person.person_gift_ideas.map(person_gift_idea => {
        let gift = this.props.gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
        if (gift) {
          return <PersonSavedGift key={uuid()} id={person_gift_idea.id} gift={gift} selectedPerson={this.props.person}/>
        }
      })
  }

  renderGiftsNeeded = () => {
    let pges = this.props.person.person_gift_events.filter(pge => pge.gift === null)
    return pges.map(pge => {
      return <EventCard key={uuid()} event={pge.event} person={this.props.person} pge={pge}/>
    })
  }

  renderPastGifts = () => {
    let pges = this.props.person.person_gift_events.filter(pge => pge.gift !== null)
    return pges.map(pge => {
      return <EventCard key={uuid()} event={pge.event} person={this.props.person} pge={pge}/>
    })
  }

  handleDeletePerson = () => {
    fetch(`http://localhost:3000/api/v1/people/${this.props.person.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      resetState(this.props.currentUser.id)
      this.props.history.push(`/my-people`)
      this.props.deletePerson(this.props.person.id)

    })
  }

  showForm = () => {
    this.setState({showForm: true})
  }

  handleSidebarHide = () => {
    this.setState({
      showForm: false,
      formMessage: ""
    })
  }

  changeMessage = (message) => {
    this.setState({
      formMessage: message
    })
  }

  renderNotes = () => {
    return(
      <div className="person-notes">
        <p>{this.props.person.notes}</p>
      </div>
    )
  }

  render() {

    return (
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
          <EditPersonForm person={this.props.person} changeMessage={this.changeMessage} formMessage={this.state.formMessage}/>
          <Button onClick={this.handleDeletePerson}>Delete Person</Button>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.showForm}>
          <AppHeader logout={this.props.logout}/>
          <SideNav />
          <div className="person-show-content">
            <h1 className="inline">{this.props.person.name}</h1>
            <Button className="edit-person-button" onClick={this.showForm}>Edit Person</Button>
            <div className="person-note-container">
            <p>Notes:</p>
            {this.props.person.notes !== "" ?
            this.renderNotes()
            :
            <p className="person-add-notes" onClick={this.showForm}>Add notes...</p>}
            </div>
            <h2>{`Need gifts for ${this.props.person.name}`}</h2>
            {this.renderGiftsNeeded()}
            <h2>Saved Gifts</h2>
            {this.renderPersonGiftIdeas()}
            <h2>Gift History</h2>
            {this.renderPastGifts()}

          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts,
    user_id: state.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePerson: (personId) => dispatch({type: "DELETE_PERSON", payload: personId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);

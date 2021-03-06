import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import EditGiftForm from './EditGiftForm'
import GiftHistoryCard from './GiftHistoryCard'
import PersonSaveForm from './PersonSaveForm'
import EventSaveForm from './EventSaveForm'
import SideNav from '../SideNav'
import AppHeader from '../AppHeader'

import { Button, Sidebar, Menu, Card } from 'semantic-ui-react'

import { resetState } from '../../resetState'

// Gift Show Page: Gift details

class GiftDetail extends Component {

  state = {
    showForm: false
  }

  // All events where this gift was given
  renderGiftHistory = () => {
    if (this.props.gift.person_gift_events.length > 0){
      return this.props.gift.person_gift_events.map(pge => {
        return <GiftHistoryCard key={uuid()} event={pge.event} person={pge.person} gift={this.props.gift} pge={pge}/>
      })
    }
    else {
      return "You have not given this gift before!"
    }
  }

  // Delete Gift - callback passed to button in sidebar with edit form
  handleDeleteGift = () => {
    fetch(`${this.props.url}/gifts/${this.props.gift.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      resetState(this.props.currentUser.id)
      this.props.history.push(`/my-gifts`)
      this.props.deleteGift(this.props.gift.id)

    })
  }

  // show sidebar with edit form
  showForm = () => {
    this.setState({showForm: true})
  }

  // hide sidebar with edit form
  handleSidebarHide = () => {
    this.setState({showForm: false})
  }

  // render notes on gift if they exist
  renderNotes = () => {
    return(
      <div className="notes">
        <p>{this.props.gift.notes}</p>
      </div>
    )
  }

  render() {
    const { gift } = this.props
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
          <EditGiftForm gift={gift} handleSidebarHide={this.handleSidebarHide}/>
          <Button onClick={this.handleDeleteGift}>Delete Gift</Button>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.showForm}>
          <AppHeader logout={this.props.logout}/>
          <SideNav />
          <div className="gift-show-content">
            <h1 className="inline">{gift.name}</h1>
            <Button className="edit-gift-button" onClick={this.showForm}>Edit Gift</Button>
            <br/>
            <img className="gift-show-image" src={gift.image} alt={gift.name}/>
            <div className="gift-details">
              <p>Store: {gift.store}</p>
              <p>Price: ${parseFloat(gift.list_price).toFixed(2)}</p>
              <a id="store-link" href={gift.link}>Store Link</a><br/>
              <br/>
              <p>Notes:</p>
              {gift.notes === "" || gift.notes === null?
              <p className="add-notes" onClick={this.showForm}>Add notes...</p>
              :
              this.renderNotes()}
            </div>

            <div className="save-container">
              <Card.Group>
                <Card className="save-form">
                  <p className="title">Gift History</p>
                  <div>
                  {this.renderGiftHistory()}
                  </div>
                </Card>
                <Card className="save-form">
                  <p className="title">Save to Person</p>
                  <PersonSaveForm gift={gift}/>
                </Card>
                <Card className="save-form">
                  <p className="title">Save to Event</p>
                  <EventSaveForm gift={gift}/>
                </Card>
              </Card.Group>
            </div>
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
    user_id: state.user_id,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGift: (giftId) => dispatch({type: "DELETE_GIFT", payload: giftId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftDetail);

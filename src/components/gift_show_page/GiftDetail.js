import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import EditGiftForm from './EditGiftForm'
import GiftHistoryCard from './GiftHistoryCard'
import PersonSaveForm from './PersonSaveForm'
import EventSaveForm from './EventSaveForm'
import SideNav from '../SideNav'
import AppHeader from '../AppHeader'

import { Button, Sidebar, Menu, Grid, Card } from 'semantic-ui-react'

import { resetState } from '../../resetState'



class GiftDetail extends Component {

  state = {
    showForm: false
  }

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

  handleDeleteGift = () => {
    fetch(`http://localhost:3000/api/v1/gifts/${this.props.gift.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      resetState(this.props.currentUser.id)
      this.props.history.push(`/my-gifts`)
      this.props.deleteGift(this.props.gift.id)

    })
  }

  showForm = () => {
    this.setState({showForm: true})
  }

  handleSidebarHide = () => {
    this.setState({showForm: false})
  }

  render() {
    console.log(this.props.gift);
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
              <p>{gift.notes !== "" ? gift.notes : <p>Add notes...</p>}</p>
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
    user_id: state.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGift: (giftId) => dispatch({type: "DELETE_GIFT", payload: giftId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftDetail);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import EditGiftForm from './EditGiftForm'
import GiftHistoryCard from './GiftHistoryCard'
import PersonSaveForm from './PersonSaveForm'
import EventSaveForm from './EventSaveForm'
import SideNav from '../SideNav'
import Header from '../Header'

import { Button, Sidebar, Menu } from 'semantic-ui-react'

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
          <EditGiftForm gift={gift}/>
          <Button onClick={this.handleDeleteGift}>Delete Gift</Button>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.showForm}>
          <Header logout={this.props.logout}/>
          <SideNav />
          <div className="planner-content">
            <h1>{gift.name}</h1>
            <Button onClick={this.showForm}>Edit Gift</Button>
            <img className="gift-show-image" src={gift.image} alt={gift.name}/>
            <p>Store: {gift.store}</p>
            <p>List Price: ${parseFloat(gift.list_price).toFixed(2)}</p>
            <a href={gift.link}>Store Link</a>
            <p>Notes:</p>
            <p>{gift.notes !== null ? gift.notes : "Add notes..."}</p>
            <h2>Gift History</h2>
            {this.renderGiftHistory()}
            <h2>Save to Person</h2>
            <PersonSaveForm gift={gift}/>
            <h2>Save to Event</h2>
            <EventSaveForm gift={gift}/>
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

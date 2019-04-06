import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'

import EventPersonCard from './EventPersonCard'
import EventGiftCard from './EventGiftCard'




class EventDetail extends Component {

  state = {
    selectedPerson: this.props.event.person_gift_events[0].person
  }

  changeSelectedPerson = (person) => {
    this.setState({selectedPerson: person})
  }

  renderAllGifts = () => {
    return this.props.gifts.map(gift => {
      return <EventGiftCard key={gift.id} gift={gift} status="all" selectedPerson={this.state.selectedPerson}/>
    })
  }

  missingGifts = () => {
    return this.props.event.person_gift_events.some(pge => {
      return pge.gift === null
    })
  }

  people = () => {
    return this.props.event.person_gift_events.map(pge => {
      return <EventPersonCard key={pge.person.id} pge={pge} person={pge.person} selectedPerson={this.state.selectedPerson} changeSelectedPerson={this.changeSelectedPerson}/>
    })
  }


  render() {
    return (
      <div>
        <h1>{this.props.event.title}</h1>
        <p>{this.props.event.dateFormatted}</p>
        <p>{this.props.event.notes ? `Notes: ${this.props.event.notes}` : "Add notes"}</p>
        {this.missingGifts() ? "Missing Gifts!" : "Gifts Complete!"}
        <div>
        {this.people()}
        </div>

        <h2>Saved Event Gift Ideas</h2>



        <h2>See all gifts</h2>
        {this.renderAllGifts()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts

  }
}

export default connect(mapStateToProps)(EventDetail);

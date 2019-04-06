import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'

import EventPersonCard from './EventPersonCard'




class EventDetail extends Component {



  state = {
    peopleMissingGifts: []
  }


  missingGifts = () => {
    return this.props.event.person_gift_events.some(pge => {
      return pge.gift === null
    })
  }

  people = () => {
    return this.props.event.person_gift_events.map(pge => {
      return <EventPersonCard key={pge.person.id} pge={pge} person={pge.person} />
    })
  }


  render() {
    return (
      <div>
        <h1>{this.props.event.title}</h1>
        <p>{this.props.event.dateFormatted}</p>
        <p>{this.props.event.notes ? `Notes: ${this.props.event.notes}` : "Add notes"}</p>
        {this.missingGifts() ? "Missing Gifts!" : "Gifts Complete!"}
        {this.people()}

        <h2>Saved Event Gift Ideas</h2>

        

        <h2>See all gifts</h2>

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventDetail);

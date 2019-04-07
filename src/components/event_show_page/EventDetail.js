import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

// import { Card } from 'semantic-ui-react'

import EventPersonCard from './EventPersonCard'
import OtherGift from './OtherGift'
import PersonSavedGift from './PersonSavedGift'
import EventSavedGift from './EventSavedGift'




class EventDetail extends Component {

  state = {
    selectedPerson: {},
    personGiftEvent: {}
  }

  componentDidMount() {
    let pge = this.props.event.person_gift_events.sort(pge => pge.id)
    this.setState({
      selectedPerson: pge[0].person,
      personGiftEvent: pge[0]
    })
  }

  changeSelectedPerson = (person, pge) => {
    this.setState({
      selectedPerson: person,
      personGiftEvent: pge
    })
  }

  otherGifts = () => {
    let person = this.props.people.find(person => {
      return person.id === this.state.selectedPerson.id
    })
    if (person) {
      let pgeSelected = person.person_gift_events.filter(pge => pge.gift !== null)
      let giftIds = pgeSelected.map(pge => pge.gift.id)
      let person_gift_ideas = person.person_gift_ideas.map(pgi => pgi.gift_idea_id)
      let event_gift_ideas = this.props.event.event_gift_ideas.map(egi => egi.gift_idea_id)
      let selectedGiftIds = person_gift_ideas.concat(event_gift_ideas).concat(giftIds)

      let selectedGifts = selectedGiftIds.map(id => {
        return this.props.gifts.find(gift => gift.id === id)
      })

      return this.props.gifts.filter(gift => {
        return selectedGifts.every(sg => {
          return sg.id !== gift.id
        })
      })
    }
  }

  renderOtherGifts = () => {
    let otherGifts = this.otherGifts()

    if (otherGifts) {
      return otherGifts.map(gift => {
        return <OtherGift key={uuid()} gift={gift} event={this.props.event} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent}/>
      })
    }
  }

  missingGifts = () => {
    return this.props.event.person_gift_events.some(pge => {
      return pge.gift === null
    })
  }

  people = () => {
    let pge = this.props.event.person_gift_events.sort((a, b) => a.id - b.id)
    return pge.map(pge => {
      return <EventPersonCard key={uuid()} pge={pge} person={pge.person} selectedPerson={this.state.selectedPerson} changeSelectedPerson={this.changeSelectedPerson}/>
    })
  }

  pgeId = () => {
    let id
    if (this.state.personGiftEvent.gift) {
      id = this.state.personGiftEvent.gift.id
    }
    else {
      id = null
    }
    return id
  }

  renderPersonGiftIdeas = () => {
    let person = this.props.people.find(person => {
      return person.id === this.state.selectedPerson.id
    })
    if (person) {
      return person.person_gift_ideas.map(person_gift_idea => {
        let gift = this.props.gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
        if (gift && gift.id !== this.pgeId()) {
          return <PersonSavedGift key={uuid()} id={person_gift_idea.id} gift={gift} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent}/>
        }
      })
    }
  }

  renderEventGiftIdeas = () => {
    let event = this.props.events.find(e => e.id === this.props.event.id)

    if (event) {
      return event.event_gift_ideas.map(event_gift_idea => {
        let gift = this.props.gifts.find(gift => gift.id === event_gift_idea.gift_idea_id)
        if (gift && gift.id !== this.pgeId()) {
          return <EventSavedGift key={uuid()} id={event_gift_idea.id} gift={gift} event={event} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent}/>
        }
      })
    }


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
        {this.renderEventGiftIdeas()}
        <h2>{`Saved Gift Ideas for ${this.state.selectedPerson.name}`}</h2>
        {this.renderPersonGiftIdeas()}



        <h2>See other gifts</h2>
        {this.renderOtherGifts()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts,
    people: state.people,
    events: state.events

  }
}

export default connect(mapStateToProps)(EventDetail);

import React, { Component } from 'react';
import { connect } from 'react-redux'

// import { Card } from 'semantic-ui-react'

import EventPersonCard from './EventPersonCard'
import OtherGift from './OtherGift'
import PersonSavedGift from './PersonSavedGift'
import EventSavedGift from './EventSavedGift'




class EventDetail extends Component {

  state = {
    selectedPerson: this.props.event.person_gift_events[0].person
  }

  changeSelectedPerson = (person) => {
    this.setState({selectedPerson: person})
  }

  otherGifts = () => {
    let person = this.props.people.find(person => {
      return person.id === this.state.selectedPerson.id
    })
    if (person) {
      let person_gift_ideas = person.person_gift_ideas.map(pgi => pgi.gift_idea_id)
      let event_gift_ideas = this.props.event.event_gift_ideas.map(egi => egi.gift_idea_id)
      let selectedGiftIds = person_gift_ideas.concat(event_gift_ideas)

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
        return <OtherGift key={gift.id} gift={gift} event={this.props.event} selectedPerson={this.state.selectedPerson}/>
      })
    }
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

  renderPersonGiftIdeas = () => {
    let person = this.props.people.find(person => {
      return person.id === this.state.selectedPerson.id
    })
    if (person) {
      return person.person_gift_ideas.map(person_gift_idea => {
        let gift = this.props.gifts.find(gift => gift.id === person_gift_idea.gift_idea_id)
        if (gift) {
          return <PersonSavedGift key={gift.id} id={person_gift_idea.id} gift={gift} selectedPerson={this.state.selectedPerson}/>
        }
      })
    }
  }

  renderEventGiftIdeas = () => {
    let event = this.props.events.find(e => e.id === this.props.event.id)

    if (event) {
      return event.event_gift_ideas.map(event_gift_idea => {
        let gift = this.props.gifts.find(gift => gift.id === event_gift_idea.gift_idea_id)
        if (gift) {
          return <EventSavedGift key={gift.id} id={event_gift_idea.id} gift={gift} event={event} selectedPerson={this.state.selectedPerson}/>
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

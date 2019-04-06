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

  otherGifts = () => {
    let person = this.props.people.find(person => {
      return person.id === this.state.selectedPerson.id
    })
    if (person) {
      let selectedGifts = person.gift_ideas.concat(this.props.event.gift_ideas)
      console.log(selectedGifts);
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
        return <EventGiftCard key={gift.id} gift={gift} status="other" selectedPerson={this.state.selectedPerson}/>
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

      return person.gift_ideas.map(gift => {
        return <EventGiftCard key={gift.id} gift={gift} status="saved_person" selectedPerson={this.state.selectedPerson}/>
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
    people: state.people

  }
}

export default connect(mapStateToProps)(EventDetail);

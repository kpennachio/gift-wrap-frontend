import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Card, Icon, Sidebar, Button, Menu } from 'semantic-ui-react'

import EventPersonCard from './EventPersonCard'
import OtherGift from './OtherGift'
import PersonSavedGift from './PersonSavedGift'
import EventSavedGift from './EventSavedGift'
import EditEventForm from './EditEventForm'
import SideNav from '../SideNav'
import AppHeader from '../AppHeader'



class EventDetail extends Component {

  state = {
    selectedPerson: {},
    personGiftEvent: {},
    currentPeople: [],
    showForm: false
  }

  componentDidMount() {
    let pge = this.props.event.person_gift_events.sort(pge => pge.id)
    this.setState({
      selectedPerson: pge[0].person,
      personGiftEvent: pge[0],
      currentPeople: this.findPeopleIds()
    })
  }

  findPeopleIds = () => {
    return this.props.event.person_gift_events.map(pge => {
      return pge.person.id
    })
  }

  changeSelectedPerson = (person, pge) => {
    this.setState({
      selectedPerson: person,
      personGiftEvent: pge
    })
  }

  changePersonGiftEvent = (pge) => {
    this.setState({personGiftEvent: pge})
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
    // let otherGifts = this.otherGifts()
    //
    // if (otherGifts) {
    //   return otherGifts.map(gift => {
    //     return <OtherGift key={uuid()} gift={gift} event={this.props.event} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent}/>
    //   })
    // }

      return this.props.gifts.map(gift => {
        return <OtherGift key={uuid()} gift={gift} event={this.props.event} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent}/>
      })

  }

  missingGifts = () => {
    return this.props.event.person_gift_events.some(pge => {
      return pge.gift === null
    })
  }

  people = () => {
    let pge = this.props.event.person_gift_events.sort((a, b) => a.id - b.id)
    return pge.map(pge => {
      return <EventPersonCard key={uuid()} pge={pge} person={pge.person} selectedPerson={this.state.selectedPerson} changeSelectedPerson={this.changeSelectedPerson} changePersonGiftEvent={this.changePersonGiftEvent}/>
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
          return <PersonSavedGift key={uuid()} id={person_gift_idea.id} gift={gift} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent} changePersonGiftEvent={this.changePersonGiftEvent}/>
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
          return <EventSavedGift key={uuid()} id={event_gift_idea.id} gift={gift} event={event} selectedPerson={this.state.selectedPerson} pge={this.state.personGiftEvent} changePersonGiftEvent={this.changePersonGiftEvent}/>
        }
      })
    }


  }

  check = () => {
    if (this.missingGifts()) {
      return "unchecked inline"
    }
    else return "checked inline"
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
          <EditEventForm event={this.props.event} currentPeople={this.state.currentPeople} history={this.props.history} />
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.showForm}>
          <AppHeader logout={this.props.logout}/>
          <SideNav />
          <div className="planner-content" >
            <h1 className="inline margin-right">{this.props.event.title}</h1>
            <Icon size="big" className={this.check()} name="check circle outline" />
            <Button onClick={this.showForm}>Edit Event</Button>
            <p>{this.props.event.dateFormatted}</p>
            <p>{this.props.event.notes ? `Notes: ${this.props.event.notes}` : "Add notes"}</p>
            {this.missingGifts() ?
              <p>Missing Gifts!</p>
              :
              <p>Gifts Complete!</p>
            }
            <Card.Group>
            {this.people()}
            </Card.Group>

            <h2>Saved Event Gift Ideas</h2>

            <Card.Group>
              {this.renderEventGiftIdeas()}
            </Card.Group>

            <h2>{`Saved Gift Ideas for ${this.state.selectedPerson.name}`}</h2>
            <Card.Group>
              {this.renderPersonGiftIdeas()}
            </Card.Group>
            <h2>See other gifts</h2>
            <Card.Group>

              {this.renderOtherGifts()}

            </Card.Group>
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
    gifts: state.gifts,
    people: state.people,
    events: state.events

  }
}

export default connect(mapStateToProps)(EventDetail);

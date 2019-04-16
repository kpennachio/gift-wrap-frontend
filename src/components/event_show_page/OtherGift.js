import React from 'react';
import { connect } from 'react-redux'

import { Card, Button, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { resetState } from '../../resetState'




const OtherGift = (props) => {

  const {gift, event, selectedPerson, addNewPersonGiftIdea, addNewEventGiftIdea, pge, editPersonGiftEvent, people, gifts, currentUser, url, deletePersonGiftIdea, deleteEventGiftIdea} = props


  const handlePersonClick = () => {
    if (gift.person_gift_ideas.find(pgi => pgi.person_id === selectedPerson.id)) {
      let pgi = gift.person_gift_ideas.find(pgi => pgi.person_id === selectedPerson.id)
      unSavePersonIdea(pgi.id)
    }
    else saveIdeaPerson()

  }

  const unSavePersonIdea = (id) => {
    fetch(`${url}/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
      resetState(currentUser.id)
    })
  }

  const saveIdeaPerson = () => {
    let data = {
      person_id: selectedPerson.id,
      gift_idea_id: gift.id
    }
    fetch("http://localhost:3000/api/v1/person_gift_ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pgi => {
      addNewPersonGiftIdea(pgi)
      resetState(currentUser.id)
    })
  }




  const handleEventClick = () => {
    if (gift.event_gift_ideas.find(egi => egi.event_id === event.id)) {
      let egi = gift.event_gift_ideas.find(egi => egi.event_id === event.id)
      unSaveEventIdea(egi.id)
    }
    else saveIdeaEvent()

  }

  const unSaveEventIdea = (id) => {
    fetch(`http://localhost:3000/api/v1/event_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deleteEventGiftIdea(id, event.id)
      resetState(currentUser.id)
    })
  }


  const saveIdeaEvent = () => {
    let data = {
      event_id: event.id,
      gift_idea_id: gift.id
    }
    fetch("http://localhost:3000/api/v1/event_gift_ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(egi => {
      addNewEventGiftIdea(egi)
      resetState(currentUser.id)

    })
  }

  const selectGift = () => {
    let data = {
      gift_id: gift.id,
      gift_actual_cost: gift.list_price
    }

    fetch(`http://localhost:3000/api/v1/person_gift_events/${pge.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pge => {
      pge.person = people.find(person => person.id === pge.person_id)
      pge.gift = gifts.find(gift => gift.id === pge.gift_id)

      editPersonGiftEvent(pge)
      resetState(currentUser.id)
    })
  }

  const savePersonHeart = () => {
    // does gift have person_gift_ideas?
    // does the person_gift_idea match the person_id of the selected person?
    if (gift.person_gift_ideas.find(pgi => pgi.person_id === selectedPerson.id)) {
      return (
        <div className="heart-container">
          <Icon name="heart" className="event-page" size="large" onClick={handlePersonClick} />{`Saved to ${selectedPerson.name}`}
        </div>
    )}
    else return (
      <div className="heart-container">
        <Icon name="heart outline" className="event-page" size="large" onClick={handlePersonClick} />{`Save to ${selectedPerson.name}`}
      </div>
    )
  }

  const saveEventHeart = () => {
    // does gift have event_gift_ideas?
    // does the event_gift_idea match the event_id of the event?
    if (gift.event_gift_ideas.find(egi => egi.event_id === event.id)) {
      return (
        <div className="heart-container">
          <Icon name="heart" className="event-page" size="large" onClick={handleEventClick} />Saved to Event
        </div>
    )}
    else return (
      <div className="heart-container">
        <Icon name="heart outline" className="event-page" size="large" onClick={handleEventClick} />Save to Event
      </div>
    )
  }

  return (
    <Card
      className="gift"
    >
      <Card.Content>
      <Card.Header className="gift-name">{gift.name}</Card.Header>
      <Card.Meta>{gift.store} ${parseInt(gift.list_price).toFixed(2)}</Card.Meta>
      <Image src={gift.image} alt={gift.name} className="gift"/>
        <div className="button-content">
            {saveEventHeart()}
            {savePersonHeart()}
          <Button onClick={selectGift}>{`Select this gift for ${selectedPerson.name}`}</Button>
        </div>
      </Card.Content>

    </Card>

  );

}
//
// <Card>
//   <Card.Header>{gift.name}</Card.Header>
//   <Card.Content>
//   <Image src={gift.image} alt={gift.name}/>
//   </Card.Content>
//     <Button onClick={saveIdeaEvent}>Save idea for event</Button>
//     <Button onClick={saveIdeaPerson}>{`Save idea for ${selectedPerson.name}`}</Button>
//     <Button onClick={selectGift}>{`Select this gift for ${selectedPerson.name}`}</Button>
// </Card>


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA", payload: {person_id: pgi.person_id, pgi: pgi} } )},
    addNewEventGiftIdea: (egi) => {dispatch({type: "ADD_NEW_EVENT_GIFT_IDEA", payload: {event_id: egi.event_id, egi: egi}})},
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, pge: pge}})},
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )},
    deleteEventGiftIdea: (egi_id, event_id) => {dispatch({type: "DELETE_EVENT_GIFT_IDEA", payload: {event_id: event_id, egi_id: egi_id} } )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherGift);

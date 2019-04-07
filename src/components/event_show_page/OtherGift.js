import React from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'

import { resetState } from '../../resetState'




const OtherGift = (props) => {

  const {gift, event, selectedPerson, addNewPersonGiftIdea, addNewEventGiftIdea, pge, editPersonGiftEvent, people, gifts, currentUser} = props


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
    })
  }

  const selectGift = () => {
    let data = {
      gift_id: gift.id
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

  return (
    <Card>
      <h3>{gift.name}</h3>
      <Button onClick={saveIdeaEvent}>Save idea for event</Button>
      <Button onClick={saveIdeaPerson}>{`Save idea for ${selectedPerson.name}`}</Button>
      <Button onClick={selectGift}>{`Select this gift for ${selectedPerson.name}`}</Button>
    </Card>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA", payload: {person_id: pgi.person_id, pgi: pgi} } )},
    addNewEventGiftIdea: (egi) => {dispatch({type: "ADD_NEW_EVENT_GIFT_IDEA", payload: {event_id: egi.event_id, egi: egi}})},
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, pge: pge}})}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherGift);

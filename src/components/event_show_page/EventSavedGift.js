import React from 'react';
import { connect } from 'react-redux'

import { Card, Button, Image } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const EventSavedGift = (props) => {

  const {id, gift, event, selectedPerson, deleteEventGiftIdea, currentUser, people, gifts, editPersonGiftEvent, pge, changePersonGiftEvent} = props

  const unSaveIdea = () => {
    fetch(`http://localhost:3000/api/v1/event_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deleteEventGiftIdea(id, event.id)
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
      changePersonGiftEvent(pge)
      editPersonGiftEvent(pge)
      resetState(currentUser.id)
    })
  }

  return (
    <Card>
      <Card.Header>{gift.name}</Card.Header>
      <Card.Content>
      <Image src={gift.image} alt={gift.name}/>
      </Card.Content>
      <div onClick={unSaveIdea}>heart</div>
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
    deleteEventGiftIdea: (egi_id, event_id) => {dispatch({type: "DELETE_EVENT_GIFT_IDEA", payload: {event_id: event_id, egi_id: egi_id} } )},
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, pge: pge}})}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSavedGift);

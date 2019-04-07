import React from 'react';
import { connect } from 'react-redux'

import { Card, Button } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const PersonSavedGift = (props) => {

  const {id, gift, pge, selectedPerson, deletePersonGiftIdea, editPersonGiftEvent, people, gifts, currentUser, changePersonGiftEvent} = props

  const unSaveIdea = () => {
    fetch(`http://localhost:3000/api/v1/person_gift_ideas/${id}`, {method: "DELETE"})
    .then(resp => {
      deletePersonGiftIdea(id, selectedPerson.id)
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
      changePersonGiftEvent(pge)
      editPersonGiftEvent(pge)
      resetState(currentUser.id)
    })
  }

  return (
    <Card>
      <h3>{gift.name}</h3>
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
    deletePersonGiftIdea: (pgi_id, person_id) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA", payload: {person_id: person_id, pgi_id: pgi_id} } )},
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, pge: pge}})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSavedGift);

import React from 'react';
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const EventPersonCard = (props) => {

  const {person, pge, selectedPerson, changeSelectedPerson, changePersonGiftEvent, people, editPersonGiftEvent, currentUser} = props

  const removeGift = () => {
    let data = {
      gift_id: null,
      gift_actual_cost: 0
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
      pge.gift = null
      changePersonGiftEvent(pge)
      editPersonGiftEvent(pge)
      resetState(currentUser.id)
    })
  }

  const displayGift = () => {
    if (pge.gift === null) {
      return <p>Find a gift for {person.name}!</p>
    }
    else {
      return (
        <div>
          <img src={pge.gift.image} alt={pge.gift.name}/>
          <Button onClick={removeGift}>X</Button>
        </div>
      )
    }
  }

  const className = () => {
    if (selectedPerson.id === person.id) {
      return "person selected-person"
    }
    else {
      return "person"
    }
  }

  return (
    <div className={className()} onClick={() => changeSelectedPerson(person, pge)}>
      <h3>{person.name}</h3>
      {displayGift()}
    </div>
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
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: pge})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPersonCard);

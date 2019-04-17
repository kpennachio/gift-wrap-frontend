import React from 'react';
import { connect } from 'react-redux'

import { Button, Card } from 'semantic-ui-react'

import { resetState } from '../../resetState'



const EventPersonCard = (props) => {

  const {person, pge, selectedPerson, changeSelectedPerson, changePersonGiftEvent, people, editPersonGiftEvent, currentUser, url} = props

  const removeGift = () => {
    let data = {
      gift_id: null,
      gift_actual_cost: 0
    }
    fetch(`${url}/person_gift_events/${pge.id}`, {
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
      return (
        <div>
        <p>Find a gift for {person.name}!</p>
        </div>
      )
    }
    else {
      return (
          <div>
          <img className="gift" src={pge.gift.image} alt={pge.gift.name}/>
          <Button id="remove-gift" onClick={removeGift}>X</Button>
          </div>
      )
    }
  }

  const className = () => {
    if (selectedPerson.id === person.id) {
      return "find-gift selected-person"
    }
    else {
      return "find-gift"
    }
  }

  return (
    <Card className={className()} onClick={() => changeSelectedPerson(person, pge)}>
      <Card.Content>
      <h3>{person.name}</h3>
      <div>
        {displayGift()}
      </div>
      </Card.Content>
    </Card>
  );

}

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
    editPersonGiftEvent: (pge) => {dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: pge})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPersonCard);

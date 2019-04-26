import React from 'react';
import { connect } from 'react-redux'

import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import resetState from '../../resetState'
import slugify from '../../slug'



const EventPersonCard = (props) => {

  const {person, pge, selectedPerson, changeSelectedPerson, changePersonGiftEvent, people, editPersonGiftEvent, currentUser, url, history} = props

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

  const goToGiftPage = (name) => {
    history.push(`/my-gifts/${slugify(name)}`)
  }

  const displayGift = () => {
    if (pge.gift === null) {
      return (
        <div id="find-gift-person">
          <p>Find a gift for {person.name}!</p>
        </div>
      )
    }
    else {
      return (
          <div >
          <Card.Meta className="gift-name">{pge.gift.name}<br />
          {pge.gift.store} ${parseInt(pge.gift.list_price).toFixed(2)}</Card.Meta>
          <img onClick={() => goToGiftPage(pge.gift.name)} id="gift-pic" src={pge.gift.image} alt={pge.gift.name}/>
          <Button id="remove-gift" onClick={removeGift}>Unselect Gift!</Button>
          </div>
      )
    }
  }

  const className = () => {
    if (selectedPerson.id === person.id) {
      return "find-gift selected-person text-align-center"
    }
    else {
      return "find-gift text-align-center"
    }
  }

  return (
    <Card className={className()} >
      <Card.Content >
      <Link id="event-person-name" to={`/my-people/${person.id}`}>{person.name}</Link>
      <div onClick={() => changeSelectedPerson(person, pge)}>
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

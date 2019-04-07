import React from 'react';
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'




const EventPersonCard = ({person, pge, selectedPerson, changeSelectedPerson}) => {


  const removeGift = () => {
    let data = {
      gift_id: null
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
      console.log(pge);
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
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventPersonCard);

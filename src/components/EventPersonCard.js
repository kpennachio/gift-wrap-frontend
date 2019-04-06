import React from 'react';
import { connect } from 'react-redux'

// import { Card } from 'semantic-ui-react'




const EventPersonCard = ({person, pge, selectedPerson}) => {

  const displayGift = () => {
    if (pge.gift === null) {
      return <p>Find a gift for {person.name}!</p>
    }
    else {
      return <img src={pge.gift.image} />
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
    <div className={className()}>
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

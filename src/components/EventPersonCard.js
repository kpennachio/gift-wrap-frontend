import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const EventPersonCard = ({person, pge}) => {

  const displayGift = () => {
    if (pge.gift === null) {
      return <p>Find a gift for {person.name}!</p>
    }
    else {
      return <img src={pge.gift.image} />
    }
  }

  return (
    <Card>
      <h3>{person.name}</h3>
      {displayGift()}
    </Card>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventPersonCard);

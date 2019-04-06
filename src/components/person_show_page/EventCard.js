import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const EventCard = ({event, person, pge}) => {


  const renderGift = () => {
    console.log(pge);
    if (pge.gift === null) {
      return <p>{`Find a gift for ${person.name}`}</p>
    }
    else {
      return (
        <div>
        {pge.gift.name}
        <img src={pge.gift.image} alt={pge.gift.name} />
        </div>
      )
    }
  }


  return (

    <Card>
      <h3>{event.title}</h3>
      <p>{event.date}</p>

      {renderGift()}
    </Card>


  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventCard);

import React from 'react';
import { connect } from 'react-redux'

import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'




const EventCard = ({event, person, pge}) => {


  const renderGift = () => {
    if (pge.gift === null) {
      return <Link to="/my-gifts">{`Find a gift for ${person.name}`}</Link>
    }
    else {
      return (
        <Link to={`/my-gifts/${pge.gift.id}`}>
        {pge.gift.name}
        <Image className="gift" src={pge.gift.image} alt={pge.gift.name} />
        </Link>
      )
    }
  }


  return (

    <Card className="person-event">
      <Card.Header as={Link} to={`/checklist/${event.id}`}>
        <p>{event.title}</p>
        <p>{event.date}</p>
      </Card.Header>
      <Card.Content>

      {renderGift()}
      </Card.Content>
    </Card>


  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(EventCard);

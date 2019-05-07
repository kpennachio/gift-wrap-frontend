import React from 'react';
import { connect } from 'react-redux'

import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


// Person show page: Event under "Need Gifts for [Person]" or event under "Gift History"

const EventCard = ({event, person, pge}) => {


  // if event has a gift, show gift with link to gift show page
  // if event does not have a gift, link to all gifts page
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

  // link card to event show page
  return (

    <Card className="person-event">
      <Card.Header as={Link} to={`/checklist/${slugEventUrl(event)}`}>
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

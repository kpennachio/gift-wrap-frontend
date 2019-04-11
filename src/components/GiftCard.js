import React from 'react';
import { connect } from 'react-redux'

import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'




const GiftCard = ({gift}) => {



  return (

    <Card
      as={Link} to={`/my-gifts/${gift.id}`}
    >
      <Card.Header>{gift.name}</Card.Header>
      <Card.Content>
      <Image src={gift.image} alt={gift.name}/>
      </Card.Content>

    </Card>


  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(GiftCard);

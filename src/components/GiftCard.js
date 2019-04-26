import React from 'react';
import { connect } from 'react-redux'

import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'




const GiftCard = ({gift}) => {

  const slug = (name) => {
    return name.toLowerCase().split(" ").join("-")
  }

  return (

    <Card
      as={Link} to={`/my-gifts/${slug(gift.name)}`}
      className="gift"
    >
      <Card.Content>
      <Card.Header className="gift-name">{gift.name}</Card.Header>
      <Card.Meta>{gift.store} ${parseInt(gift.list_price).toFixed(2)}</Card.Meta>
      <Image src={gift.image} alt={gift.name} className="gift"/>
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

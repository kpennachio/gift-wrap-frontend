import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'




const GiftCard = ({gift}) => {



  return (

    <Card
      as={Link} to={`my-gifts/${gift.id}`}
    >
      <h3>{gift.name}</h3>
      <img src={gift.image} alt={gift.name}/>

    </Card>


  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(GiftCard);

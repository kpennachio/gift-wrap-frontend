import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const Gift = ({gift}) => {



  return (

    <Card>
      <h3>{gift.name}</h3>
      <img src={gift.image} />

    </Card>


  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Gift);

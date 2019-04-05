import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const Person = ({person}) => {



  return (

    <Card>
      <h3>{person.name}</h3>

    </Card>


  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Person);

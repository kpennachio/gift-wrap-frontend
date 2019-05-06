import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


// Person card (Semantic UI card) - people index page

const PersonCard = ({person}) => {

  // Person name and link to their show page
  return (

    <Card className="contact-person" as={Link} to={`my-people/${person.id}`}>
      <p className="person-name">{person.name}</p>

    </Card>

  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PersonCard);

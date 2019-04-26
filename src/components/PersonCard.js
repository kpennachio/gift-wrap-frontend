import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { slugify } from '../slug'


const PersonCard = ({person}) => {



  return (

    <Card className="contact-person" as={Link} to={`my-people/${slugify(person.name)}`}>
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

import React from 'react';
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'




const Event = ({event, people}) => {

  const renderPeople = () => {
    return people.map(person => <p>{person.name}</p>)
  }

  return (

    <Card>
      <h3>{event.title}</h3>
      <p>{event.dateFormatted}</p>
      {renderPeople()}
    </Card>

  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Event);

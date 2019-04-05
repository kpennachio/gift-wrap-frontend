import React from 'react';
import { connect } from 'react-redux'

import Person from './Person'



const PeoplePage = (props) => {


  const renderAllPeople = () => {
    return props.people.map(person => {
      return <Person key={person.id} person={person} />
    })
  }

  return (
    <div>
      <h1>My People Page</h1>
      {renderAllPeople()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people
  }
}

export default connect(mapStateToProps)(PeoplePage);

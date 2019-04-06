import React from 'react';
import { connect } from 'react-redux'

import PersonDetail from './PersonDetail'




const Person = (props) => {

  const returnPerson = () => {
    if (props.people.length > 0) {
      let person = props.people.find(person => person.id === parseInt(props.match.params.id))
      return < PersonDetail person={person} />
    }
  }

  return (
    <div>
      {returnPerson()}
    </div>
  );

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people
  }
}

export default connect(mapStateToProps)(Person);

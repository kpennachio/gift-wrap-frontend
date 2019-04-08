import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { resetState } from '../../resetState'

import { Button, Dropdown, Card } from 'semantic-ui-react'


class PersonSaveForm extends Component {

  state = {
    selections: []
  }

  personOptions = () => {
    return this.props.people.map(person => {
      return {key: person.id, text: person.name, value: person.id}
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ selections: value })
  }

  handleSubmit = () => {
    console.log("submitted");
    this.state.selections.forEach(personId => this.createNewPersonGiftIdea(personId))
  }

  createNewPersonGiftIdea = (personId) => {
    let data = {
      person_id: personId,
      gift_idea_id: this.props.gift.id
    }
    fetch("http://localhost:3000/api/v1/person_gift_ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pgi => {
      this.setState({selections: []})
      this.props.addNewPersonGiftIdea(pgi)
      resetState(this.props.currentUser.id)
      console.log(pgi);
    })
  }

  deleteSavedPerson = (pgi) => {
    fetch(`http://localhost:3000/api/v1/person_gift_ideas/${pgi.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      this.props.deletePersonGiftIdea(pgi)
      resetState(this.props.currentUser.id)
    })
  }

  renderSavedPeople = () => {
    return this.props.gift.person_gift_ideas.map(pgi =>{
      let person = this.props.people.find(person => person.id === pgi.person_id)
      return (
        <Card>
        {person.name}
        <p onClick={() => this.deleteSavedPerson(pgi)}>X</p>
        </Card>
      )
    })
  }

  render() {
    console.log(this.props.gift);

    return (
      <div>
      {this.renderSavedPeople()}
      <Dropdown
      placeholder='Person'
      fluid
      multiple
      search
      selection
      value={this.state.selections}
      options={this.personOptions()}
      onChange={this.handleChange}
      />
      <Button onClick={this.handleSubmit}>Save</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts
  }
}

function mapDispatchToProps(dispatch) {
  return{
    deletePersonGiftIdea: (pgi) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA_FROM_GIFT", payload: pgi } )},
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA_FROM_GIFT", payload: pgi } )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSaveForm)

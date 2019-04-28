import React, { Component } from 'react';
import { connect } from 'react-redux'

import { resetState } from '../../resetState'

import { Button, Dropdown, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class PersonSaveForm extends Component {

  state = {
    selections: []
  }

  personOptions = () => {
    let people = this.props.people.filter(person => {
      return this.props.gift.person_gift_ideas.every(pgi => {
        return pgi.person_id !== person.id
      })
    })
    return people.map(person => {
      return {key: person.id, text: person.name, value: person.id}
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ selections: value })
  }

  handleSubmit = () => {
    this.state.selections.forEach(personId => this.createNewPersonGiftIdea(personId))
  }

  createNewPersonGiftIdea = (personId) => {
    let data = {
      person_id: personId,
      gift_idea_id: this.props.gift.id
    }
    fetch(`${this.props.url}/api/v1/person_gift_ideas`, {
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
    })
  }

  deleteSavedPerson = (pgi) => {
    fetch(`${this.props.url}/person_gift_ideas/${pgi.id}`, {
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
        <Card  className="save-card">
        <Card.Content className="inline">
          <Link to={`/my-people/${person.id}`}>
          <p className="inline">{person.name}</p>
          </Link>
          <Icon size="large" name="heart" onClick={() => this.deleteSavedPerson(pgi)} />
        </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>

      <Dropdown
      placeholder='Person'
      multiple
      search
      selection
      value={this.state.selections}
      options={this.personOptions()}
      onChange={this.handleChange}
      />
      <Button onClick={this.handleSubmit}>Save</Button>
      <div className="saved-people">
        {this.renderSavedPeople()}
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    currentUser: state.currentUser,
    people: state.people,
    gifts: state.gifts,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return{
    deletePersonGiftIdea: (pgi) => {dispatch({type: "DELETE_PERSON_GIFT_IDEA_FROM_GIFT", payload: pgi } )},
    addNewPersonGiftIdea: (pgi) => {dispatch({type: "ADD_NEW_PERSON_GIFT_IDEA_FROM_GIFT", payload: pgi } )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSaveForm)

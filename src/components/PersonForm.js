import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea } from 'semantic-ui-react'



class PersonForm extends Component {

  state = {
    name: "",
    notes: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewPerson()
    this.setState({
      name: "",
      notes: ""
    })
  }

  createNewPerson = () => {
    let data = {
      user_id: this.props.currentUser.id,
      name: this.state.name,
      notes: this.state.notes
    }
    fetch('http://localhost:3000/api/v1/people', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(person => {
      console.log(person);
      person.person_gift_events = []
      person.person_gift_ideas = []
      this.props.addNewPerson(person)
    })
  }

  render() {
    return(
      <div>
        <h2>Add a new person</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field control={Input} value={this.state.name} name="name" label='Name' placeholder='Name' onChange={this.handleChange} />
          <Form.Field control={Input} value={this.state.notes} name="notes" label='Notes' placeholder='Notes' onChange={this.handleChange} />
          <Button type='submit'>Add Person</Button>
        </Form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    addNewPerson: (person) => dispatch({type: "ADD_NEW_PERSON", payload: person}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);

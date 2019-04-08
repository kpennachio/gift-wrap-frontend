import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea } from 'semantic-ui-react'



class EditPersonForm extends Component {

  state = {
    name: this.props.person.name,
    notes: this.props.person.notes
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.editPerson()
  }

  editPerson = () => {
    let data = {
      name: this.state.name,
      notes: this.state.notes
    }
    fetch(`http://localhost:3000/api/v1/people/${this.props.person.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(person => {
      this.props.editPerson(person)
    })
  }

  render() {
    return(
      <div>
        <h2>Edit Person</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field control={Input} value={this.state.name} name="name" label='Name' placeholder='Name' onChange={this.handleChange} />
          <Form.Field control={TextArea} value={this.state.notes} name="notes" label='Notes' placeholder='Notes' onChange={this.handleChange} />
          <Button type='submit'>Edit Person</Button>
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
    editPerson: (person) => dispatch({type: "EDIT_PERSON", payload: person}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPersonForm);
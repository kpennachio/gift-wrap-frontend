import React, { Component } from 'react'
import { connect } from 'react-redux'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Button, Form, Input, Dropdown, TextArea } from 'semantic-ui-react'



class EventForm extends Component {

  state = {
    event: "",
    day: "",
    notes: "",
    registry_link: "",
    people: [],
    showingNewPersonInput: false,
    newPersonName: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleDayChange = (day) => {
    this.setState({day})
  }

  handleDropdown = (e) => {
    console.log(e.target.value);
  }

  dropdownOptions = () => {
    if (this.props.people) {
      return this.props.people.map(person => {
        console.log(person.id);
        return {key: person.id, text: person.name, value: person.id}
      })
    }
  }

  showInput = (e) => {
    this.setState({showingNewPersonInput: true})
    e.target.innerText = ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    return(
      <div>
        <h2>Add Event</h2>
          <Form onSubmit={this.handleSubmit}>

              <Form.Field control={Input} name="event" label='Event' placeholder='Event' onChange={this.handleChange}/>

              <Form.Field label='Date' control={DayPickerInput} onDayChange={this.handleDayChange}/>

              <Form.Field control={Input} label='Who are you getting a gift for?'
                control={Dropdown}
                placeholder='Select people...'
                fluid
                multiple
                search
                selection
                options={this.dropdownOptions()}
                onChange={this.handleDropdown}
              />
              <Form.Group
                style={{ display: (this.state.showingNewPersonInput ? 'block' : 'none') }}>
              <Form.Field control={Input} label='Add a New Person' placeholder='Name' />
              </Form.Group>

              <p onClick={this.showInput}>Click to add a new person</p><br/>


              <Form.Field control={Input} label='Registry Link' name="registry_link" placeholder='Registry Link (optional)' onChange={this.handleChange}/>


              <Form.Field control={TextArea} label='Notes' name="notes" placeholder='Notes
              (optional)' onChange={this.handleChange}/>

            <Button type='submit'>Add Event</Button>
          </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.currentUser.people
  }
}

export default connect(mapStateToProps)(EventForm);

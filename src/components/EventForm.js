import React, { Component } from 'react'
import { connect } from 'react-redux'


import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/it';

import 'react-day-picker/lib/style.css';
import { Button, Form, Input, Dropdown, TextArea, Divider, Icon } from 'semantic-ui-react'

import { resetState } from '../resetState'

// New event form - checklist page

class EventForm extends Component {

  state = {
    event: "",
    day: "",
    notes: "",
    registry_link: "",
    dateFormatted: "",
    currentPeople: [],
    message: ""
  }

  // handle form change for event title, notes, or registry link
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // handle form change for date with React Daypicker
  handleDayChange = (day) => {
    if (day) {
      this.setState({
        day: day,
        dateFormatted: day.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      })
    }
  }

  // ############# Form Person Changes ###########################################

  // Event form add/remove people dropdown options
  // Dropdown menu shows existing people
  // If a new person is typed in and pressed enter, their name is added to the dropdown list
  dropdownOptions = () => {
    if (this.props.people) {
      return this.props.people.map(person => {
        if (person.id !== null) {
          return {key: person.id, text: person.name, value: person.id}
        }
        else {
          return {key: person.name, text: person.name, value: person.name}
        }
      })
    }
  }

  // If a new person is written in input, add them to people in state so name will be in dropdown options
  handlePersonAddition = (e, { value }) => {
    this.props.addNewPersonName(value)
  }

  // If changes made to people in form, change in state
  handlePersonChange = (e, { value }) => {
    this.setState({ currentPeople: value })
  }

  // ################## On Form Submit #####################################

  // Submit form
  handleSubmit = (e) => {
    e.preventDefault()

    // add new event in db
    this.addNewEvent()

    // if new people names were added via dropdown input, remove them from state so there will not be duplicates once new people added to db
    this.props.removeNewPersonNames()
  }

  // add new event in db
  addNewEvent = () => {
    let data = {
      user_id: this.props.currentUser.id,
      title: this.state.event,
      date: this.state.day.toLocaleDateString().split("/").join("-"),
      registry_link: this.state.registry_link,
      notes: this.state.notes
    }
    fetch(`${this.props.url}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(event => {
      if (event.errors) {
        this.setState({ message: event.errors[0].split('^')[1] })
      }
      else {
        let date = new Date(event.date)
        event.month = date.getMonth()
        event.year = date.getFullYear()
        event.dateFormatted = this.state.dateFormatted
        event.person_gift_events = []
        event.event_gift_ideas = []
        this.props.addNewEvent(event)
        this.handlePeopleChange(event.id)

        this.setState({
          event: "",
          day: "",
          notes: "",
          registry_link: "",
          dateFormatted: "",
          currentPeople: [],
          message: "Event created!"
        })
      }
    })
  }

  // add people and/or remove people from event
  // take all people from event form input and sort actions
  handlePeopleChange = (eventId) => {
    // if person exists in db (passed as id number), add them to the new event
    let existingPeopleIds = this.state.currentPeople.filter(id => typeof id === "number")
    existingPeopleIds.forEach(personId => this.addNewPersonGiftEvent(personId, eventId))

    // if person does not exist in db (passed as name string), add the new person to db
    let newNames = this.state.currentPeople.filter(name => typeof name === "string")
    newNames.forEach(name => this.addNewPerson(name, eventId))
  }

  // Create new person in db
  addNewPerson = (personName, eventId) => {
    let data = {
      user_id: this.props.currentUser.id,
      name: personName
    }

    fetch(`${this.props.url}/people`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(person => {
      person.person_gift_events = []
      person.person_gift_ideas = []
      this.props.addNewPerson(person)
      // connnect new person to event by creating new PersonGiftEvent in db
      this.addNewPersonGiftEvent(person.id, eventId)
    })
  }

  // Create new person/event association (PersonGiftEvent) in db
  addNewPersonGiftEvent = (person_id, event_id) => {
    let data = {
      person_id: person_id,
      event_id: event_id,
      price_max: 0,
      gift_actual_cost: 0
    }

    fetch(`${this.props.url}/person_gift_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pge => {
      resetState(this.props.currentUser.id)
      this.props.addNewPersonGiftEvent(pge)
    })
  }



  render() {
    return(
      <div className="form">

          <p className="form-header">Add Event</p>
          <Icon name="close" size="large" className="form" onClick={this.props.handleSidebarHide}/>
          <Divider />
          <p>{this.state.message}</p>
            <Form onSubmit={this.handleSubmit}>

                <Form.Field required control={Input} value={this.state.event} name="event" label='Event' placeholder='Event' onChange={this.handleChange} />

                <Form.Field required label='Date' value={this.state.day} control={DayPickerInput} onDayChange={this.handleDayChange} formatDate={formatDate} parseDate={parseDate} placeholder={`${formatDate(new Date())}`}/>

                <Form.Field
                  required
                  value={this.state.currentPeople}
                  label='Who are you getting a gift for? (select at least one person)'
                  control={Dropdown}
                  options={this.dropdownOptions() ? this.dropdownOptions() : []}
                  placeholder='Select people...'
                  search
                  selection
                  fluid
                  multiple
                  allowAdditions
                  onAddItem={this.handlePersonAddition}
                  onChange={this.handlePersonChange}
                />

                <Form.Field control={Input} value={this.state.registry_link} label='Registry Link' name="registry_link" placeholder='Registry Link (optional)' onChange={this.handleChange}/>


                <Form.Field control={TextArea} value={this.state.notes} label='Notes' name="notes" placeholder='Notes
                (optional)' onChange={this.handleChange}/>

              <Button
                type='submit'
                disabled={this.state.event === ""
                || this.state.day === ""
                || this.state.currentPeople.length === 0
                }
                >
                Add Event
              </Button>
            </Form>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    people: state.people,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    addNewEvent: (event) => dispatch({type: "ADD_NEW_EVENT", payload: event}),
    addNewPersonName: (personName) => dispatch({type: "ADD_NEW_PERSON_NAME", payload: personName}),
    removeNewPersonNames: () => dispatch({type: "REMOVE_NEW_PERSON_NAMES"}),
    addNewPerson: (person) => dispatch({type: "ADD_NEW_PERSON", payload: person}),
    addNewPersonGiftEvent: (pge) => {dispatch({type: "ADD_NEW_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, person_id: pge.person_id, id: pge.id} } )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);

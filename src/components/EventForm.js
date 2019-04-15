import React, { Component } from 'react'
import { connect } from 'react-redux'


import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/it';

import 'react-day-picker/lib/style.css';
import { Button, Form, Input, Dropdown, TextArea, Sidebar, Divider, Icon } from 'semantic-ui-react'

import { resetState } from '../resetState'



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

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleDayChange = (day) => {
    if (day) {
      this.setState({
        day: day,
        dateFormatted: day.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      })
    }
  }


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



  handlePersonAddition = (e, { value }) => {
    this.props.addNewPersonName(value)
  }

  handlePersonChange = (e, { value }) => {
    this.setState({ currentPeople: value })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.addNewEvent()
    this.props.removeNewPersonNames()
  }

  addNewEvent = () => {
    let data = {
      user_id: this.props.currentUser.id,
      title: this.state.event,
      date: this.state.day.toLocaleDateString().split("/").join("-"),
      registry_link: this.state.registry_link,
      notes: this.state.notes
    }
    fetch('http://localhost:3000/api/v1/events', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(event => {
      if (!event.errors) {
        let date = new Date(event.date)
        event.month = date.getMonth()
        event.year = date.getFullYear()
        event.dateFormatted = this.state.dateFormatted
        event.person_gift_events = []
        event.event_gift_ideas = []
        this.props.addNewEvent(event)
        this.addNewPeople(event.id)

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


  addNewPeople = (eventId) => {
    let existingPeopleIds = this.state.currentPeople.filter(id => typeof id === "number")
    existingPeopleIds.forEach(personId => this.addNewPersonGiftEvent(personId, eventId))

    let newNames = this.state.currentPeople.filter(name => typeof name === "string")
    newNames.forEach(name => this.addNewPerson(name, eventId))
  }


  addNewPerson = (personName, eventId) => {
    let data = {
      user_id: this.props.currentUser.id,
      name: personName
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
      person.person_gift_events = []
      person.person_gift_ideas = []
      this.props.addNewPerson(person)
      this.addNewPersonGiftEvent(person.id, eventId)
    })
  }

  addNewPersonGiftEvent = (person_id, event_id) => {
    let data = {
      person_id: person_id,
      event_id: event_id,
      price_max: 0,
      gift_actual_cost: 0
    }

    fetch('http://localhost:3000/api/v1/person_gift_events', {
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
    people: state.people
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

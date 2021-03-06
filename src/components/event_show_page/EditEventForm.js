import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import { resetState } from '../../resetState'

// Event show page: edit event form

class EditEventForm extends Component {

  state = {
    event: this.props.event.title,
    notes: this.props.event.notes,
    day: new Date(this.props.event.date.replace(/-/g, '\/')),
    registry_link: this.props.event.registry_link,
    dateFormatted: this.props.event.dateFormatted,
    currentPeople: [],
    message: ""
  }

  componentDidMount() {
    this.setState({
      currentPeople: this.findPeopleIds()
    })
  }

  findPeopleIds = () => {
    return this.props.event.person_gift_events.map(pge => {
      return pge.person.id
    })
  }

  // handle form change for date with React Daypicker
  handleDayChange = (day) => {
    if (day) {
      this.setState({
        dateFormatted: day.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        day: day
      })
    }
  }

  // handle form change for event title, notes, registry_link
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
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

    // db changes for event attributes: title, date, registry_link, notes
    this.editEvent()

    // if new people names were added via dropdown input, remove them from state so there will not be duplicates once new people added to db
    this.props.removeNewPersonNames()
    // add people and/or remove people from event
    this.handlePeopleChange(this.props.event.id)
  }

  // add people and/or remove people from event
  // take all people from event form input and sort actions
  handlePeopleChange = (eventId) => {
    // if person exists in db (passed as id number), check to see if they were already associated with the event
    let existingPeopleIds = this.state.currentPeople.filter(id => typeof id === "number")
    existingPeopleIds.forEach(personId => this.comparePersonId(personId))

    // if person does not exist in db (passed as name string), add the new person and associate them with the event
    let newNames = this.state.currentPeople.filter(name => typeof name === "string")
    newNames.forEach(name => this.addNewPerson(name))

    // find if there were any people removed from the event and delete their person_gift_event
    let removedPeople = this.findPeopleIds().filter(personId => {
      return existingPeopleIds.every(oldId => {
        return oldId !== personId
      })
    })

    removedPeople.forEach(personId => {
      this.deletePersonGiftEvent(personId)
    })
  }

  // If existing person was not already associated with event, add them to the event
  comparePersonId = (id) => {
    if (!this.findPeopleIds().includes(id)) {
      this.addNewPersonGiftEvent(id)
    }
  }

  // If person removed from event, need to delete PersonGiftEvent from db
  deletePersonGiftEvent = (personId) => {
    let pge = this.props.event.person_gift_events.find(pge => pge.person.id === personId)
    fetch(`${this.props.url}/person_gift_events/${pge.id}`, {
      method: "DELETE",
    })
    .then(resp => {
      console.log("deleted");
    })
  }

  // Edit event in db
  editEvent = () => {
    let data = {
      user_id: this.props.currentUser.id,
      title: this.state.event,
      date: this.state.day.toLocaleDateString().split("/").join("-"),
      registry_link: this.state.registry_link,
      notes: this.state.notes
    }
    fetch(`${this.props.url}/events/${this.props.event.id}`, {
      method: "PATCH",
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
        event.dateFormatted = this.state.dateFormatted
        event.person_gift_events = this.props.event.person_gift_events
        event.event_gift_ideas = this.props.event.event_gift_ideas
        this.props.editEvent(event)
        resetState(this.props.currentUser.id)

        this.setState({
          message: "Event updated!"
        })
      }
    })
  }


  // Create new person in db
  addNewPerson = (personName) => {
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
      this.addNewPersonGiftEvent(person.id)
      this.setState((prevState => ({
        currentPeople: [...prevState.currentPeople, person.id]
      })))
    })
  }

  // Create new person/event association (PersonGiftEvent) in db
  addNewPersonGiftEvent = (person_id) => {
    let data = {
      person_id: person_id,
      event_id: this.props.event.id,
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


  // Delete event on delete event button click
  handleDeleteEvent = () => {
    fetch(`${this.props.url}/events/${this.props.event.id}`, {
      method: "DELETE"
    })
    .then(resp => {
      resetState(this.props.currentUser.id)
      this.props.history.push(`/checklist`)
    })
  }

  render() {
    return(
      <div>
        <h2>Edit Event</h2>
        <p>{this.state.message}</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required control={Input} name="event" label='Event' placeholder='Event' value={this.state.event} onChange={this.handleChange} />

          <Form.Field required label='Date' control={DayPickerInput} onDayChange={this.handleDayChange} formatDate={formatDate} parseDate={parseDate} value={this.state.day} placeholder={`${formatDate(new Date())}`}/>

          <Form.Field
            required
            label='Who are you getting a gift for? (select at least one person)'
            control={Dropdown}
            options={this.dropdownOptions() ? this.dropdownOptions() : []}
            value={this.state.currentPeople}
            placeholder='Select people...'
            search
            selection
            fluid
            multiple
            allowAdditions
            onAddItem={this.handlePersonAddition}
            onChange={this.handlePersonChange}
          />

          <Form.Field control={Input} label='Registry Link' name="registry_link" value={this.state.registry_link} placeholder='Registry Link (optional)' onChange={this.handleChange}/>


          <Form.Field control={TextArea} label='Notes' name="notes" placeholder='Notes (optional)' value={this.state.notes} onChange={this.handleChange}/>

          <Button
            type='submit'
            disabled={this.state.event === ""
            || this.state.day === ""
            || this.state.currentPeople.length === 0
            }
            >
            Edit Event
          </Button>
        </Form>
        <div>
          <Button onClick={this.handleDeleteEvent}>Delete Event</Button>
        </div>
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
    editEvent: (event) => dispatch({type: "EDIT_EVENT", payload: event}),
    addNewPersonName: (personName) => dispatch({type: "ADD_NEW_PERSON_NAME", payload: personName}),
    removeNewPersonNames: () => dispatch({type: "REMOVE_NEW_PERSON_NAMES"}),
    addNewPersonGiftEvent: (pge) => {dispatch({type: "ADD_NEW_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, person_id: pge.person_id, id: pge.id} } )},
    addNewPerson: (person) => dispatch({type: "ADD_NEW_PERSON", payload: person})

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEventForm);

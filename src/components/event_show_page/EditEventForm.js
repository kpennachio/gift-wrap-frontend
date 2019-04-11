import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';



class EditEventForm extends Component {

  state = {
    event: this.props.event.title,
    notes: this.props.event.notes,
    day: this.props.event.date,
    registry_link: this.props.event.registry_link,
    dateFormatted: this.props.event.dateFormatted,
    currentPeople: []
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

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handlePersonAddition = (e, { value }) => {
    this.props.addNewPersonName(value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.editEvent()
    this.props.removeNewPersonNames()
    this.addNewPeople(this.props.event.id)
  }

  addNewPeople = (eventId) => {
    let existingPeopleIds = this.state.currentPeople.filter(id => typeof id === "number")
    existingPeopleIds.forEach(personId => this.comparePersonId(personId))

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

  deletePersonGiftEvent = (personId) => {
    let pge = this.props.event.person_gift_events.find(pge => pge.person.id === personId)
    fetch(`http://localhost:3000/api/v1/person_gift_events/${pge.id}`, {
      method: "DELETE",
    })
    .then(resp => {
      console.log("deleted");
    })
  }

  editEvent = () => {
    let data = {
      user_id: this.props.currentUser.id,
      title: this.state.event,
      // date: this.state.day,
      registry_link: this.state.registry_link,
      notes: this.state.notes
    }
    fetch(`http://localhost:3000/api/v1/events/${this.props.event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(event => {
      event.person_gift_events = this.props.event.person_gift_events
      event.event_gift_ideas = this.props.event.event_gift_ideas
      this.props.editEvent(event)
    })
  }

  comparePersonId = (id) => {
    if (!this.findPeopleIds().includes(id)) {
      this.addNewPersonGiftEvent(id)
    }
  }

  addNewPerson = (personName) => {
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
      this.addNewPersonGiftEvent(person.id)
      this.setState((prevState => ({
        currentPeople: [...prevState.currentPeople, person.id]
      })))
    })
  }

  addNewPersonGiftEvent = (person_id) => {
    let data = {
      person_id: person_id,
      event_id: this.props.event.id,
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
      this.props.addNewPersonGiftEvent(pge)

    })
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



  render() {
    return(
      <div>
        <h2>Edit Event</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field control={Input} name="event" label='Event' placeholder='Event' value={this.state.event} onChange={this.handleChange} />

          <Form.Field label='Date' control={DayPickerInput} onDayChange={this.handleDayChange} formatDate={formatDate} parseDate={parseDate} placeholder={`${formatDate(new Date())}`}/>

          <Form.Field
            label='Who are you getting a gift for?'
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

        <Button type='submit'>Edit Event</Button>
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
    editEvent: (event) => dispatch({type: "EDIT_EVENT", payload: event}),
    addNewPersonName: (personName) => dispatch({type: "ADD_NEW_PERSON_NAME", payload: personName}),
    removeNewPersonNames: () => dispatch({type: "REMOVE_NEW_PERSON_NAMES"}),
    addNewPersonGiftEvent: (pge) => {dispatch({type: "ADD_NEW_PERSON_GIFT_EVENT", payload: {event_id: pge.event_id, person_id: pge.person_id, id: pge.id} } )},
    addNewPerson: (person) => dispatch({type: "ADD_NEW_PERSON", payload: person})

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEventForm);

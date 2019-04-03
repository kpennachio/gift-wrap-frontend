import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


export default class EventForm extends Component {

  state = {
    event: "",
    date: "",
    notes: "",
    registry_link: "",
    person1: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleDayChange = (day) => {
    this.setState({day})
  }

  render() {
    return(
      <div>
        <h2>Add Event</h2>

          <form onSubmit={console.log("submit")}>
            <label>
              Event:
              <input type="text" name="event" value={this.state.event} onChange={this.handleChange} />
            </label>
            <label>
              Date:
              <DayPickerInput onDayChange={this.handleDayChange}/>
            </label>
            <label>
              Notes:
              <input type="text" name="notes" placeholder="Optional" value={this.state.notes} onChange={this.handleChange} />
            </label>
            <label>
              Registry Link:
              <input type="text" name="registry_link" placeholder="Optional" value={this.state.registry_link} onChange={this.handleChange} />
            </label>
            <label>
              Person:
              <input type="text" name="person" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Add Event" />
          </form>
      </div>
    )
  }
}

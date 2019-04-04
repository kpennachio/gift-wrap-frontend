import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Button, Checkbox, Form, Input, Dropdown, Select, TextArea } from 'semantic-ui-react'



export default class EventForm extends Component {

  state = {
    event: "",
    date: "",
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
    const people = [{id:1, name:"allie"}, {id:2, name:"mom"}]
    return people.map(person => {
      return {key: person.id, text: person.name, value: person.id}
    })
  }

  showInput = (e) => {
    this.setState({showingNewPersonInput: true})
    e.target.innerText = ""
  }



  render() {
    return(
      <div>
        <h2>Add Event</h2>
          <Form>

              <Form.Field control={Input} label='Event' placeholder='Event' onChange={this.handleChange}/>

              <Form.Field label='Date' control={DayPickerInput} onDayChange={this.handleDayChange}/>

              <Form.Field control={Input} label='Who gets a gift?'
                control={Dropdown}
                placeholder='Choose Person...'
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

              <p onClick={this.showInput}>Add a new person?</p><br/>


              <Form.Field control={Input} label='Registry Link' placeholder='Registry Link (optional)' onChange={this.handleChange}/>


              <Form.Field control={TextArea} label='Notes' placeholder='Notes
              (optional)' onChange={this.handleChange}/>

            <Form.Field control={Button}>Add Event</Form.Field>
          </Form>
      </div>
    )
  }
}

// datalist
// list='people' placeholder='Choose Person...' />
//   <datalist id='people'>
//     {this.datalistOptions()}
//   </datalist>

// datalistOptions = () => {
//   const people = ["allie", "mom", "dad", "kevin"]
//   return people.map(person => {
//     return <option value={person} />
//   })
// }

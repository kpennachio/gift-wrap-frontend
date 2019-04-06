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

  render() {
    return(
      <div>
        <h2>Add a new person</h2>
        <Form>
          <Form.Field control={Input} name="name" label='Name' placeholder='Name' onChange={this.handleChange} />
          <Form.Field control={Input} name="notes" label='Notes' placeholder='Notes' onChange={this.handleChange} />
        </Form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return  {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);

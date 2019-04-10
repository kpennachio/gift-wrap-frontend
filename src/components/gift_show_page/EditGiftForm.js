import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea } from 'semantic-ui-react'



class EditGiftForm extends Component {

  state = {
    name: this.props.gift.name,
    notes: this.props.gift.notes
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.editGift()
  }

  editGift = () => {
    // let data = {
    //   name: this.state.name,
    //   notes: this.state.notes
    // }
    // fetch(`http://localhost:3000/api/v1/people/${this.props.gift.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(resp => resp.json())
    // .then(gift => {
    //   this.props.editGift(gift)
    // })
  }

  render() {
    return(
      <div>
        <h2>Edit Gift</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field control={Input} value={this.state.name} name="name" label='Name' placeholder='Name' onChange={this.handleChange} />
          <Form.Field control={TextArea} value={this.state.notes} name="notes" label='Notes' placeholder='Notes' onChange={this.handleChange} />
          <Button type='submit'>Edit Gift</Button>
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
    editGift: (gift) => dispatch({type: "EDIT_GIFT", payload: gift}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditGiftForm);

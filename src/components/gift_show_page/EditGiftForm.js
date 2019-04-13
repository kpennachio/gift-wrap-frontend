import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea } from 'semantic-ui-react'

import { resetState } from '../../resetState'


class EditGiftForm extends Component {

  state = {
    name: this.props.gift.name,
    notes: this.props.gift.notes,
    image: this.props.gift.image,
    list_price: this.props.gift.list_price,
    store: this.props.gift.store,
    link: this.props.gift.link,
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.editGift()
  }

  editGift = () => {
    fetch(`http://localhost:3000/api/v1/gifts/${this.props.gift.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(gift => {
      this.props.editGift(gift)
      resetState(this.props.currentUser.id)
    })
  }

  seeResult = (result) => {
    if (result.event === "success") {
      this.setState({image: result.info.secure_url})
    }
  }


  openWidget = (e) => {
    e.preventDefault()
    let widget = window.cloudinary.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME, uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      sources: [ 'local', 'url']},
      (error, result) => {this.seeResult(result)});
    widget.open();
  }

  render() {
    return(
      <div>
        <h2>Edit Gift</h2>
        <Form onSubmit={this.handleSubmit}>
        <Form.Field required control={Input} name="name" label='Gift' placeholder='Gift' onChange={this.handleChange} value={this.state.name} />

        <Form.Field control={Input} label='Store' name="store" placeholder='Store' value={this.state.store} onChange={this.handleChange}/>

        <Form.Field control={Input} type="number" step="0.01" label='List Price' name="list_price" placeholder='List Price' value={this.state.list_price} onChange={this.handleChange}/>

        <Form.Field control={Input} label='Link' name="link" placeholder='Link' value={this.state.link} onChange={this.handleChange}/>

        <Form.Field control={Input} name="image" label="Image" value={this.state.image} onChange={this.handleChange}/>

        <Button onClick={this.openWidget} >Select Image</Button>

        <Form.Field control={TextArea} label='Notes' name="notes" placeholder='Notes' onChange={this.handleChange} value={this.state.notes}/>

        <Button
          type='submit'
          disabled={this.state.name === ""}
          >
          Edit Gift
        </Button>
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

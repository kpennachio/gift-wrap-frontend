import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, Dropdown, TextArea } from 'semantic-ui-react'



class GiftForm extends Component {

  state = {
    name: "",
    notes: "",
    image: "",
    list_price: "",
    store: "",
    link: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  handleSubmit = (e) => {
    e.preventDefault()

    let image = this.state.image
    let listPrice = this.state.list_price
    if (image === "") {
      image = "https://res.cloudinary.com/dum7xzjkm/image/upload/v1554660115/cpoqoqfywcjl3cm4qsnn.jpg"
    }
    if (listPrice === "") {
      listPrice = 0
    }

    let data = {
      user_id: this.props.currentUser.id,
      name: this.state.name,
      notes: this.state.notes,
      image: image,
      list_price: listPrice,
      store: this.state.store,
      link: this.state.link
    }

    this.addNewGift(data)
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

  addNewGift = (data) => {
    fetch('http://localhost:3000/api/v1/gifts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(gift => {
      console.log(gift);
      this.props.addGift(gift)
    })
  }



  render() {
    return(
      <div>
        <h2>Add a new gift</h2>
          <Form onSubmit={this.handleSubmit}>

              <Form.Field control={Input} name="name" label='Gift' placeholder='Gift' onChange={this.handleChange} value={this.state.name} />

              <Form.Field control={Input} label='Store' name="store" placeholder='Store' value={this.state.store} onChange={this.handleChange}/>

              <Form.Field control={Input} type="number" step="0.01" label='List Price' name="list_price" placeholder='List Price' value={this.state.list_price} onChange={this.handleChange}/>

              <Form.Field control={Input} label='Link' name="link" placeholder='Link' value={this.state.link} onChange={this.handleChange}/>

              <Form.Field control={Input} name="image" label="Image" value={this.state.image} onChange={this.handleChange}/>

              <Button onClick={this.openWidget} >Select Image</Button>

              <Form.Field control={TextArea} label='Notes' name="notes" placeholder='Notes' onChange={this.handleChange} value={this.state.notes}/>

            <Button type='submit'>Add Gift</Button>
          </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    addGift: (gift) => dispatch({type: "ADD_GIFT", payload: gift}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftForm);

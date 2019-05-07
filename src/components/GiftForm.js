import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea, Divider, Icon, Image } from 'semantic-ui-react'

import { resetState } from '../resetState'

// New gift form - on My Gifts page

class GiftForm extends Component {

  state = {
    name: "",
    notes: "",
    image: "https://res.cloudinary.com/dum7xzjkm/image/upload/v1555420285/r9e7jc3weyycwrrtknah.jpg",
    list_price: "",
    store: "",
    link: "",
    age_range: "All Ages",
    message: ""
  }

  // form changes for gift name, notes, list_price, store, link
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // form changes for age_range
  setAgeRange = (e, { value }) => {
    this.setState({age_range: value})
  }

  // ############### Cloudinary widget for image upload ###################
  // form changes for image
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


  // ############### On Submit #############################################
  handleSubmit = (e) => {
    e.preventDefault()

    let listPrice = this.state.list_price
    if (listPrice === "") {
      listPrice = 0
    }

    let data = {
      user_id: this.props.currentUser.id,
      name: this.state.name,
      notes: this.state.notes,
      image: this.state.image,
      list_price: listPrice,
      store: this.state.store,
      link: this.state.link,
      age_range: this.state.age_range
    }

    this.addNewGift(data)
  }

  // Add gift in db
  addNewGift = (data) => {
    fetch(`${this.props.url}/gifts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(gift => {
      if (gift.errors) {
        this.setState({ message: gift.errors[0].split('^')[1] })
      }
      else {
        this.props.addGift(gift)
        resetState(this.props.currentUser.id)
        this.setState({
          name: "",
          notes: "",
          image: "https://res.cloudinary.com/dum7xzjkm/image/upload/v1555420285/r9e7jc3weyycwrrtknah.jpg",
          list_price: "",
          store: "",
          link: "",
          age_range: "All Ages",
          message: "Gift added!"
        })
      }
    })
  }




  render() {

    const ageOptions = [
      {
        key: 'All Ages',
        text: 'All Ages',
        value: 'All Ages',
      },
      {
        key: 'Babies',
        text: 'Babies',
        value: 'Babies',
      },
      {
        key: 'Kids',
        text: 'Kids',
        value: 'Kids',
      },
      {
        key: 'Teens',
        text: 'Teens',
        value: 'Teens',
      },
      {
        key: 'Adults',
        text: 'Adults',
        value: 'Adults',
      }
    ]

    return(
      <div className="form">
        <p className="form-header">Add a new gift</p>
        <Icon name="close" size="large" className="form" onClick={this.props.handleSidebarHide}/>
        <Divider />

        <p>{this.state.message}</p>

          <Form onSubmit={this.handleSubmit}>

              <Form.Field control={Input} required name="name" label='Gift' placeholder='Gift' onChange={this.handleChange} value={this.state.name} />

              <Form.Field control={Input} label='Store' name="store" placeholder='Store' value={this.state.store} onChange={this.handleChange}/>

              <Form.Field control={Input} type="number" step="0.01" label='List Price' name="list_price" placeholder='List Price' value={this.state.list_price} onChange={this.handleChange}/>

              <Form.Field control={Input} label='Link' name="link" placeholder='Link' value={this.state.link} onChange={this.handleChange}/>

              <Button onClick={this.openWidget} className="image-selection-button" >Select Image</Button>
              <Image src={this.state.image} className="gift-form-image" alt="selected gift" />

              <Form.Dropdown
                label="Age Range"
                placeholder="Select Age Range"
                value={this.state.age_range}
                fluid
                selection
                options={ageOptions}
                onChange={this.setAgeRange}
              />

              <Form.Field control={TextArea} label='Notes' name="notes" placeholder='Notes' onChange={this.handleChange} value={this.state.notes}/>

              <Button
                type='submit'
                disabled={this.state.name === ""}
                >
                Add Gift
              </Button>
          </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return  {
    addGift: (gift) => dispatch({type: "ADD_GIFT", payload: gift}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftForm);

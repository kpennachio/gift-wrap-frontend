import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea, Icon, Divider, Image } from 'semantic-ui-react'

import { resetState } from '../../resetState'

// Gift show page: edit gift form

class EditGiftForm extends Component {

  state = {
    name: this.props.gift.name,
    notes: this.props.gift.notes,
    image: this.props.gift.image,
    list_price: this.props.gift.list_price,
    store: this.props.gift.store,
    link: this.props.gift.link,
    age_range: this.props.gift.age_range,
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
    this.editGift()
  }

  editGift = () => {
    fetch(`${this.props.url}/gifts/${this.props.gift.id}`, {
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
      this.setState({
        message: "Gift updated!"
      })
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
        <p className="form-header">Edit Gift</p>
        <Icon name="close" size="large" className="form" onClick={this.props.handleSidebarHide}/>
        <Divider />
        <p>{this.state.message}</p>

        <Form onSubmit={this.handleSubmit}>
        <Form.Field required control={Input} name="name" label='Gift' placeholder='Gift' onChange={this.handleChange} value={this.state.name} />

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
          Edit Gift
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
    editGift: (gift) => dispatch({type: "EDIT_GIFT", payload: gift}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditGiftForm);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Grid, Accordion, Icon, Form } from 'semantic-ui-react'




class BudgetEvent extends Component {

  state = {
    edit: false,
    price_max: this.props.pge.price_max
  }



  changeBudget = () => {
    this.setState({edit: true})
  }

  handleSubmit = () => {
    let data = {
      price_max: parseInt(this.state.price_max)
    }
    fetch(`http://localhost:3000/api/v1/person_gift_events/${this.props.pge.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(pge => {
      pge.person = this.props.pge.person
      this.props.editPersonGiftEvent(pge)
      this.setState({edit: false})
    })
  }

  handleChange = (e) => {
    this.setState({price_max: e.target.value})
  }


  renderBudget = () => {
    console.log(this.state.price_max);
    if (this.state.edit) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Input value={this.state.price_max} onChange={this.handleChange}/>
        </Form>
      )
    }
    else {
      return(
        <p>${this.props.pge.price_max}</p>
      )
    }
  }



  render() {
    return (

    <Grid.Column width={2} onClick={this.changeBudget}>{this.renderBudget()}</Grid.Column>

    );

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPersonGiftEvent: (pge) => dispatch({type: "EDIT_PERSON_GIFT_EVENT", payload: pge})
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEvent);

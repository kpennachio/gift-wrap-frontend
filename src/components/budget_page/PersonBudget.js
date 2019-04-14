import React, { Component} from 'react';
import { connect } from 'react-redux'

import { Grid, Form } from 'semantic-ui-react'

import { resetState } from '../../resetState'



class PersonBudget extends Component {

  state = {
    edit: false,
    price_max: this.props.pge.price_max
  }


  changeBudget = () => {
    this.setState({edit: true})
  }

  handleSubmit = (e) => {
    e.stopPropagation()

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
      resetState(this.props.currentUser.id)
      this.props.editPersonGiftEvent(pge)
      // this.setState({edit: false})
    })
  }

  handleChange = (e) => {
    this.setState({price_max: e.target.value})
  }


  renderBudget = () => {
    if (this.state.edit) {
      return (
        <div className="border-line">
          <Form onSubmit={this.handleSubmit}>
            <Form.Input size="mini" type="number" min="0" value={this.state.price_max} onChange={this.handleChange}/>
          </Form>
        </div>
      )
    }
    else {
      return(
        <div className="border-line">
          <p>${this.props.pge.price_max}</p>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonBudget);

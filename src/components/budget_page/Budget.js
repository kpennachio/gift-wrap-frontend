import React, { Component} from 'react';
import { connect } from 'react-redux'

import { Grid, Form, Button, Icon, Modal, Header, Input } from 'semantic-ui-react'

import { resetState } from '../../resetState'

import BudgetForm from './BudgetForm'



class Budget extends Component {

  state = {
    edit: false,
    budgetObj: "",
    budgetId: "",
    budget: "",
    showModal: false
  }



  addNewBudget = () => {

    let data = {
      user_id: this.props.currentUser.id,
      budget: this.state.budget,
      year: this.props.year
    }
    console.log(data);
    fetch(`${this.props.url}/budgets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(budget => {
      console.log(budget);
      this.props.setBudget(budget)
      this.closeModal()
    })
  }

  editBudget = () => {
    let data = {
      budget: this.state.budget
    }
    console.log(data);
    fetch(`${this.props.url}/budgets/${this.state.budgetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(budget => {
      this.props.setBudget(budget)
      this.closeModal()
    })
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({budget: e.target.value})
  }

  handleSubmit = () => {
    if (this.state.budgetId === ""){
      this.addNewBudget()
    }
    else {
      this.editBudget()
    }
  }



  findBudget = () => {
    if (this.props.budget) {

      if (this.props.budget.budget) {

        return (
          <div onClick={(e) => this.setId(e, this.props.budget.id, this.props.budget.budget)}>
            <p>{`Max $${parseInt(this.props.budget.budget)}`}</p>
            <Icon name="pencil"/>
          </div>
        )
      }
      else if (this.props.budget.budget === null) {
        console.log("null budget");
        return (
          <div onClick={(e) => this.setId(e, this.props.budget.id, "")}>
            <p>Add Max Budget</p>
            <Icon name="pencil"/>
          </div>
        )
      }
      else {
        return (
          <div onClick={this.clearId}>
            <p>Add Max Budget</p>
            <Icon name="pencil"/>
          </div>
        )
      }
    }
  }

  setId = (e, id, budget) => {
    console.log("set");
    this.setState({budgetId: id, budget: budget})
  }

  clearId = (e) => {
    console.log("clear");
    this.setState({budgetId: ""})
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }


  render() {

    return (
      <div>
      <Modal
        onClose={this.closeModal}
        open={this.state.showModal}
        trigger={<Button onClick={() => this.setState({ showModal: true })}>{this.findBudget()}</Button>} >
        <Header content={`Your ${this.props.year} Gift Budget`} />
        <Modal.Content>
          <p>Set your max gift budget here:</p>
          <Form onSubmit={this.handleSubmit}>
            <Input value={this.state.budget} onChange={this.handleChange}/>
            <Input type="submit"/>
          </Form>
        </Modal.Content>
      </Modal>
      </div>
    );

  }

}



function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    budgets: state.budgets,
    url: state.url,
    budget: state.budget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addBudget: (budget) => dispatch({type: "ADD_BUDGET", payload: budget}),
    editBudget: (budget) => dispatch({type: "EDIT_BUDGET", payload: budget}),
    setBudget: (budget) => dispatch({type: "SET_BUDGET", payload: budget})

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);

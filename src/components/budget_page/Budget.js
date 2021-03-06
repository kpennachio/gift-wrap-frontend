import React, { Component} from 'react';
import { connect } from 'react-redux'

import { Form, Button, Icon, Modal, Header, Input } from 'semantic-ui-react'

import { resetState } from '../../resetState'


// Budgeter page: annual budget
// Button to add/edit annual budget

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
      this.props.setBudget(budget)
      this.closeModal()
      resetState(this.props.currentUser.id)
    })
  }

  editBudget = () => {
    let data = {
      budget: this.state.budget
    }
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
      resetState(this.props.currentUser.id)

    })
  }

  handleChange = (e) => {
    this.setState({budget: e.target.value})
  }

  // on submit, add or edit budget depending on if budget id exists
  handleSubmit = () => {
    if (this.state.budgetId === ""){
      this.addNewBudget()
    }
    else {
      this.editBudget()
    }
  }

  // conditionally render add or edit to budget button
  // also set budget id in state
  findBudget = () => {
    if (this.props.budget) {
      if (this.props.budget.budget) {
        // if there is an annual budget, onclick store ID and show edit form
        return (
          <div className="budget-edit-form" onClick={(e) => this.setId(e, this.props.budget.id, this.props.budget.budget)}>
            <p className="budget-edit">{`Max $${parseInt(this.props.budget.budget)}`}</p>
            <Icon className="inline" name="pencil"/>
          </div>
        )
      }
      else if (this.props.budget.budget === null) {
        // if budget for year exists in db, but budget amount is null
        return (
          <div onClick={(e) => this.setId(e, this.props.budget.id, "")}>
            <p>Add Max Budget</p>
            <Icon className="inline" name="pencil"/>
          </div>
        )
      }
      else {
        // if there is no budget in db for year
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
    this.setState({budgetId: id, budget: budget})
  }

  clearId = (e) => {
    this.setState({budgetId: ""})
  }

  // open / close budget form modal

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
        trigger={<Button onClick={() => this.setState({ showModal: true })}>{this.findBudget()}</Button>}
        size="mini"
        >
        <Header content={`Your ${this.props.year} Gift Budget`} />
        <Modal.Content>
          <p>Set your max gift budget here:</p>
          <Form onSubmit={this.handleSubmit}>
            <Input type="number" min="0" value={parseInt(this.state.budget)} onChange={this.handleChange}/>
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

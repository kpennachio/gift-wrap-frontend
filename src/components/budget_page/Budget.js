import React, { Component} from 'react';
import { connect } from 'react-redux'

import { Grid, Form, Button, Icon, Modal, Header, Input } from 'semantic-ui-react'

import { resetState } from '../../resetState'

import BudgetForm from './BudgetForm'



class Budget extends Component {
s
  state = {
    edit: false,
    budgetObj: "",
    budgetId: "",
    budget: "",
    formStyle: "none",
    buttonStyle: "block"
  }
  //
  //
  //
  // changeBudget = () => {
  //   this.setState({edit: true})
  // }
  //
  addNewBudget = () => {

    let data = {
      user_id: this.props.currentUser.id,
      budget: parseInt(this.state.budget),
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
      this.setState({budgetId: budget.id})
      console.log(budget);
    })
  }

  handleChange = (e) => {
    this.setState({budget: e.target.value})
  }

  handleSubmit = () => {
    if (this.state.budgetId !== ""){
      this.addNewBudget()
    }
    else {
      console.log("edit budget");
    }
  }

  showBudgetForm = () => {

  }

  findBudget = () => {
    if (this.props.budgets) {
      let budgetObj = this.props.budgets.find(budget => budget.year === this.props.year)
      if (budgetObj) {
        return (
          <div onClick={this.showBudgetForm}>
            <p>{`Max $${parseInt(budgetObj.budget)}`}</p>
            <Icon name="pencil" />
          </div>
        )
      }
      else {
        return (
          <div onClick={this.showBudgetForm}>
            <p>Add Max Budget</p>
          </div>
        )
      }
    }
  }


  showAddBudget = (e) => {
    this.setState({formStyle: "block"})
    this.setState({buttonStyle: "none"})
  }



  render() {
    return (
      <div>
      {this.findBudget()}
      <Modal trigger={this.findBudget()} >
        <Header content={`Your ${this.props.year} Gift Budget`} />
        <Modal.Content>
          <p>Set your max gift budget here:</p>
          <Input value={this.state.budget} onChange={this.handleChange}/>
          <Input type="submit" />
        </Modal.Content>
      </Modal>
      </div>
    );

  }

}

// <div>
//
//
//
//     <Button onClick={this.showAddBudget} style={{display: this.state.buttonStyle}}>Add a budget</Button>
//     <div id="add-budget" style={{display: this.state.formStyle}}>
//     <p>Add a budget</p>
//     <Form onSubmit={this.handleSubmit}>
//       <Form.Input size="mini" value={this.state.budget} onChange={this.handleChange}/>
//     </Form>
//   </div>
// </div>

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    budgets: state.budgets,
    url: state.url
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addBudget: (budget) => dispatch({type: "ADD_BUDGET", payload: budget})
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);

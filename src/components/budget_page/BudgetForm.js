import React, { Component} from 'react';
import { connect } from 'react-redux'

import { Grid, Form, Button } from 'semantic-ui-react'

import { resetState } from '../../resetState'




class BudgetForm extends Component {

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



  


  showAddBudget = (e) => {
    this.setState({formStyle: "block"})
    this.setState({buttonStyle: "none"})
  }



  render() {
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetForm);

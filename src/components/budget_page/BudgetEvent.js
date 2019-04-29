import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Grid, Accordion, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PersonBudget from './PersonBudget'


// Budgeter page: each event accordion under the budget event container

class BudgetEvent extends Component {

  state = {
    activeIndex: 0,
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  renderPeople = () => {
    return this.props.pges.map(pge => {
      return(
        <Grid key={uuid()}>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={5}><Link to={`/my-people/${pge.person.id}`}>{pge.person.name}</Link></Grid.Column>
        <PersonBudget pge={pge}/>
        <Grid.Column width={2}><p>${parseInt(pge.gift_actual_cost)}</p></Grid.Column>
        </Grid>
      )
    })
  }

  renderEvents = () => {
    return(
      <Grid className="budget-event-row">
      <Grid.Column width={4}><p>{this.props.event.dateFormatted}</p></Grid.Column>
      <Grid.Column width={5}><p>{this.props.event.title}</p></Grid.Column>
      <Grid.Column width={2}><p>${this.eventBudget()}</p></Grid.Column>
      <Grid.Column width={2}><p>${this.eventSpending()}</p></Grid.Column>
      <Grid.Column width={1}><Icon name='dropdown' /></Grid.Column>
      </Grid>
    )
  }


  eventSpending = () => {
    if (this.props.pges.length > 1) {
      let total = this.props.pges.reduce((sum, pge) => {
        return parseInt(sum.gift_actual_cost) + parseInt(pge.gift_actual_cost)
      })
      return total
    }
    else if (this.props.pges.length === 1){
      return parseInt(this.props.pges[0].gift_actual_cost)
    }
    else return 0
  }

  eventBudget = () => {
    if (this.props.pges.length > 1) {
      let total = this.props.pges.reduce((sum, pge) => {
        return sum.price_max + pge.price_max
      })
      return total
    }
    else if (this.props.pges.length === 1){
      return this.props.pges[0].price_max
    }
    else return 0
  }


  render() {
    return (
      <div className="budget-event-individual">
      <Accordion.Title active={this.state.activeIndex === this.props.event.id} index={this.props.event.id} onClick={this.handleClick}>
        {this.renderEvents()}
      </Accordion.Title>
      <Accordion.Content active={this.state.activeIndex === this.props.event.id}>
        {this.renderPeople()}
        <Grid>
          <Grid.Column width={4}></Grid.Column>

          <Grid.Column width={6}><Link to={`/checklist/${this.props.event.id}`}>select/edit gifts</Link></Grid.Column>
          <div id="end-of-event">
          </div>
        </Grid>
      </Accordion.Content>
      </div>


    );

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BudgetEvent);

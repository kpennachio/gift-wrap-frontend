import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Grid, Accordion, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'




class BudgetEvent extends Component {

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  renderPeople = () => {
    return this.props.pges.map(pge => {
      return(
        <Grid>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={5}><p>{pge.person.name}</p></Grid.Column>
        <Grid.Column width={2}><p>${pge.price_max}</p></Grid.Column>
        <Grid.Column width={2}><p>${this.personSpending()}</p></Grid.Column>
        </Grid>
      )
    })
  }

  renderEvents = () => {
    return(
      <Grid>
      <Grid.Column width={4}><p>{this.props.event.dateFormatted}</p></Grid.Column>
      <Grid.Column width={5}><h3>{this.props.event.title}</h3></Grid.Column>
      <Grid.Column width={2}><p>${this.eventBudget()}</p></Grid.Column>
      <Grid.Column width={2}><p>${this.eventSpending()}</p></Grid.Column>
      <Grid.Column width={1}><Icon name='dropdown' /></Grid.Column>
      </Grid>
    )
  }

  personSpending = () => {
    
  }

  eventSpending = () => {
    return 0
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
      <Fragment>
      <Accordion.Title active={this.state.activeIndex === this.props.event.id} index={this.props.event.id} onClick={this.handleClick}>
        {this.renderEvents()}
      </Accordion.Title>
      <Accordion.Content active={this.state.activeIndex === this.props.event.id}>
        {this.renderPeople()}
      </Accordion.Content>
      </Fragment>


    );

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BudgetEvent);

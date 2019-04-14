import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react'

import { resetState } from '../resetState'


class GiftFilter extends Component {


  state = {
    age_range: "All Ages"
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
      <div>
        <Dropdown
          placeholder="Filter by Age Range"
          selection
          options={ageOptions}
          onChange={(e, {value}) => this.props.filterAgeRange(e, {value})}
        />
        <Input
          label="$"
          type="number"
          min="0"
          onChange={this.props.filterMinPrice}
          placeholder="Price Min"
        />
        <Input
          label="$"
          type="number"
          min="0"
          onChange={this.props.filterMaxPrice}
          placeholder="Price Max"
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts
  }
}


export default connect(mapStateToProps)(GiftFilter);

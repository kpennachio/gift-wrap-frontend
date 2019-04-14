import React, { Component, Fragment } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



export default class AppHeader extends Component {

  render() {
    return (
      <Fragment>
      <Menu fixed="top" inverted size="massive">
        <Menu.Item
          name="giftWrap"
          context="Gift Wrap"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link} to='/dashboard'
          name="planningTools"
          context="Planning Tools"
        />
        <Menu.Menu position="right">
          <Dropdown
            item
            text='Account Settings'
            >
            <Dropdown.Menu>
              <Dropdown.Item
                text='Edit Profile'
                as={Link} to='/account'
                />
              <Dropdown.Item
                text='Logout'
                onClick={this.props.logout}
                />
            </Dropdown.Menu>
          </Dropdown >
        </Menu.Menu>

        </Menu>
      </Fragment>
    )
  }

}
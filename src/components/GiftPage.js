import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import GiftCard from './GiftCard'
import GiftForm from './GiftForm'
import SideNav from './SideNav'
import AppHeader from './AppHeader'
import GiftFilter from './GiftFilter'

import { Card, Sidebar, Menu, Button, Segment, Dropdown, Input } from 'semantic-ui-react'



class GiftPage extends Component {

  state ={
    showForm: false,
    age_range: "All Ages",
    maxPrice: "",
    minPrice: "",
    searchName: ""
  }

  renderAllGifts = () => {
    let orderedGifts = this.findGifts().sort((a, b) => b.id - a.id)
    return orderedGifts.map(gift => {
      return <GiftCard key={uuid()} gift={gift} />
    })
  }

  showForm = () => {
    this.setState({showForm: true})
  }

  handleSidebarHide = () => {
    this.setState({showForm: false})
  }

  searchNameGifts = () => {
    if (this.state.searchName !== "") {
      return this.props.gifts.filter(gift => {
        return gift.name.toLowerCase().includes(this.state.searchName)
      })
    }
    else return this.props.gifts
  }

  ageRangeGifts = () => {
    if (this.state.age_range === "All Ages") {
      return this.searchNameGifts()
    }
    else {
      return this.searchNameGifts().filter(gift => {
        return gift.age_range === this.state.age_range
      })
    }
  }

  findGifts = () => {
    if (this.state.maxPrice !== "" && this.state.minPrice !== "") {
      return this.ageRangeGifts().filter(gift => {
        return (
          Math.round(gift.list_price) <= parseInt(this.state.maxPrice)
          &&
          Math.round(gift.list_price) >= parseInt(this.state.minPrice)
        )
      })
    }
    else if (this.state.maxPrice !== "") {
      return this.ageRangeGifts().filter(gift => {
        return (
          Math.round(gift.list_price) <= parseInt(this.state.maxPrice)
        )
      })
    }
    else if (this.state.minPrice !== "") {
      return this.ageRangeGifts().filter(gift => {
        return (
          Math.round(gift.list_price) >= parseInt(this.state.minPrice)
        )
      })
    }
    else return this.ageRangeGifts()
  }

  filterAgeRange = (e, {value}) => {
    this.setState({age_range: value})
  }

  filterMaxPrice = (e) => {
    this.setState({maxPrice: e.target.value})
  }

  filterMinPrice = (e) => {
    this.setState({minPrice: e.target.value})
  }

  changeSearchName = (e) => {
    this.setState({searchName: e.target.value})
  }

  clearFilters = () => {
    this.setState({
      age_range: "All Ages",
      maxPrice: "",
      minPrice: "",
      searchName: ""
    })
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

    return (
      <div>
      <Sidebar.Pushable>
      <Sidebar
      as={Menu}
      animation="overlay"
      vertical
      visible={this.state.showForm}
      direction="right"
      width="very wide"
      className="form"
      onHide={this.handleSidebarHide}
      >
      <GiftForm handleSidebarHide={this.handleSidebarHide}/>
      </Sidebar>


      <Sidebar.Pusher dimmed={this.state.showForm} >

          <AppHeader logout={this.props.logout}/>
          <SideNav />

          <div id="gifts-header">
            <h1 className="inline">My Gifts</h1>
            <Button id="add-gift-button" onClick={this.showForm}>Add Gift</Button>
          </div>
          <div className="gifts-content">
            <div className="gift-filters">
              <Dropdown
                className="gift-filter"
                placeholder="Filter by Age Range"
                selection
                value={this.state.age_range}
                options={ageOptions}
                onChange={(e, {value}) => this.filterAgeRange(e, {value})}
              />
              <Input
                className="gift-filter"
                label="$"
                type="number"
                min="0"
                value={this.state.minPrice}
                onChange={this.filterMinPrice}
                placeholder="Price Min"
              />
              <Input
                className="gift-filter"
                label="$"
                type="number"
                min="0"
                value={this.state.maxPrice}
                onChange={this.filterMaxPrice}
                placeholder="Price Max"
              />
              <Input
                className="gift-filter"
                className="gift-filter"
                placeholder="Search by Name"
                value={this.state.searchName}
                onChange={this.changeSearchName}
              />
              <Button onClick={this.clearFilters}>Clear Filters</Button>
              </div>
            <Card.Group>
            {this.renderAllGifts()}
            </Card.Group>
            </div>
      </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    gifts: state.gifts
  }
}

export default connect(mapStateToProps)(GiftPage);

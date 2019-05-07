import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

// when user clicks on a router link they are taken to the top of that page
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)

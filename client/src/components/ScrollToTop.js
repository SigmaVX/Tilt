// ======================================
//
// scrolls to top of page
//
// ======================================

import {Component} from "react"
import {withRouter} from "react-router-dom";


class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    // on a change of location, scroll to top of page
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  // do this for all routes within Scroll to Top
  render() {
    return this.props.children;
  }

}

export default withRouter(ScrollToTop);
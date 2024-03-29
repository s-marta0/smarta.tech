import React from 'react'

import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'


type WithRouterProps = {
  param1: string
  location: any
}


class ScrollToTop extends React.Component<RouteComponentProps<WithRouterProps>> {

  componentDidUpdate = (prevProps: { location: any }) =>
    this.props.location !== prevProps.location &&
      window.scrollTo(0, 0)

  render = () =>
    this.props.children
}


export default withRouter(ScrollToTop)

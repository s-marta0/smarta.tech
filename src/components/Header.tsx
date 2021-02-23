import React, { FunctionComponent } from 'react'
import {
  NavLink
} from "react-router-dom"

import routes from '../routes'


const Header: FunctionComponent<{}> = ({}) =>
  <header className="Header">
    {routes.map(route =>
      <NavLink
        exact={route.link === "/"}
        to={route.link}
        activeClassName="Link--active"
      >
        {route.label}
      </NavLink>)}
  </header>


export default Header
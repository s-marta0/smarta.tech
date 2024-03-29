import React from 'react'
import { Link, NavLink } from "react-router-dom"

import routes from '../routes'
import logo from '../styles/img/logo.svg'
import greenLogo from '../styles/img/logo-green.svg'


type State = {
  opened: boolean;
  hovered: boolean;
}


class Header extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
  
    this.state = {
      opened: false,
      hovered: false
    };
  }

  render = () =>
    <>
      <header className='Header Header--placeholder' />
      <header className='Header Header--fixed'>
        <div className='container h-100'>
          <div className='d-flex flex-row align-items-center h-100'>
            <Link to='/'>
              <img
                alt=''
                className="Header__logo"
                src={this.state.hovered ? greenLogo : logo}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
              />
            </Link>
            
            <div
              className="Header__burger ml-auto"
              onClick={() => this.setState({
                opened: !this.state.opened
              })}
            />
            <div className={`Header__links ${this.state.opened && "Header__links--opened"}`}>
              {routes.slice(1).map(route =>
                <NavLink
                  key={route.link}
                  exact={route.link === "/"}
                  to={route.link}
                  className="Link"
                  activeClassName="Link--active"
                  onClick={() => this.setState({ opened: false })}
                >
                  {route.label}
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
}


export default Header

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark mb-5">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={'/'} className="navbar-brand text-light">OlimtoyMovie</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/'} className="nav-link text-light active" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/search'} className="nav-link text-light active" aria-current="page">Search</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
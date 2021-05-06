import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signout } from '../../actions/auth.actions';
import "./header.css"

const Header = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(signout())
    }
    const NonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        )
    }
    const LoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Signout</span>
                </li>
            </Nav>
        )
    }
    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="header">
            <Container fluid>
                <Navbar.Brand href="/">Admin Dashborad</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {auth.authenticate ? LoggedInLinks() : NonLoggedInLinks()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header

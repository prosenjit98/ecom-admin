import React from 'react'
import Header from '../Header';
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './layout.css'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className="home_sidebar">
                                <ul>
                                    <li><NavLink to={'/'} exact={true}>Home</NavLink></li>
                                    <li><NavLink to={'/page'} >Page</NavLink></li>
                                    <li><NavLink to={'/category'} >Category</NavLink></li>
                                    <li><NavLink to={'/products'}>Products</NavLink></li>
                                    <li><NavLink to={'/orders'} >Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} className="home_continaer"> {props.children}</Col>
                        </Row>
                    </Container>
                    : props.children
            }
        </>
    )
}

export default Layout

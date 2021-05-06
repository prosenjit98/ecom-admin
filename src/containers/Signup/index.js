import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layouts'
import Input from '../../UI/Input'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, signup } from '../../actions'

const Signup = (props) => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const subminForm = (e) => {
    e.preventDefault()
    dispatch(signup({ firstName, lastName, email, password }))
    dispatch(isUserLoggedIn())
  }

  if (auth.authenticate) {
    return <Redirect to={'/'} />
  }
  return (
    <Layout>
      <Container>
        <Row style={classes.rowMargin}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={subminForm}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                type="email"
                value=""
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <Input
                label="Password"
                type="password"
                value=""
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

const styles = style => ({
  rowMargin: {
    margin: "20px"
  }
})

export default Signup

import React from 'react'
import { Form } from 'react-bootstrap'


const Input = props => {
  return (
    <Form.Group controlId={`formBasic${props.label}`}>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} name={props.name} multiple={props.multiple} />
      <Form.Text className="text-muted">{props.errorMessages}</Form.Text>
    </Form.Group>
  )
}

export default Input

import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MyModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} size={props.size}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleSubmit}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MyModal

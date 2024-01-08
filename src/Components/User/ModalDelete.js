
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    return (
        <>
        <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete {props.dataModal.email}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xác nhận xóa?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal></>
    )
}


export {
    ModalDelete
}
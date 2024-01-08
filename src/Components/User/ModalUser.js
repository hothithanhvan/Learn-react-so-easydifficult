import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
const ModalUser = (props) => {
    return (
        <>
            <Modal show={true}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>User name</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender</label>
                            <select className='form-select' >
                                <option selected value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group</label> 
                            <select className='form-select' >
                                <option>Dev</option>
                                <option>Leader</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleConfirmDelete}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser

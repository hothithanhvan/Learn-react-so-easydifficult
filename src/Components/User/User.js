import { useState } from "react"
import { useEffect } from "react"
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom"
import { fetchAllUser } from "../../Services/userService"
import { deleteUser } from "../../Services/userService"
import { ModalDelete } from "./ModalDelete"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalUser from "./ModalUser";

const User = (props) => {

    const [listUser, setListUser] = useState("")

    const [curentPage, setCurrentPage] = useState(1)
    const [curentLimit, setCurrentLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(0)
    const [dataModal, setDataModal] = useState({})
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    useEffect(() => {
        fetchUser()
    }, [curentPage])

    const fetchUser = async () => {
        let response = await fetchAllUser(curentPage, curentLimit);
        console.log("rp", response);
        if (response && response.data.DT && response.data.EC === 0) {
            setListUser(response.data.DT.users)
            setTotalPages(response.data.DT.totalPages)
        }
    }

    const handlePageClick = (event) => {
        console.log(event);
        setCurrentPage(+event.selected + 1)
    };

    const handleDeleteUser = (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }
    const confirmDelete = async () => {
        let res = await deleteUser(dataModal)
        if (res && res.data.EC === 0) {
            toast.success(res.data.EM)
            await fetchUser()
            setIsShowModalDelete(false)
        }
        else {
            toast.error(res.data.EM)
        }
    }
    return (
        <>
            <div className="user-container">
                <div className="user-header">
                    <h3>Table Users</h3>
                </div>
                <div className="actions">
                    <button className="btn btn-success">Refresh</button>
                    <button className="btn btn-primary">Add new user</button>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listUser && listUser.length > 0 ?
                                <>
                                    {listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ""}</td>
                                                <td>
                                                    <button className="btn btn-primary">
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    No user
                                </>
                            }

                        </tbody>
                    </table>
                </div>
                {totalPages > 0}
                <div className="user-footer">
                    {/* <Items currentItems={currentItems} /> */}
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>

            <ModalDelete show={isShowModalDelete} handleClose={handleClose} 
            dataModal={dataModal}
            handleConfirmDelete={confirmDelete} />
            <ModalUser />
        </>

    )
}

export default User;
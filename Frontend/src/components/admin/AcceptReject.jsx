import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Adminlogout, getAllData, updateNEWS } from '../services/home.services';
import Swal from 'sweetalert2';

export default function AcceptReject() {
    const [Username, setUsername] = useState([]);
    const [NEWSDATA, setNEWSDATA] = useState([]);
    const [Approve, setApprove] = useState(false);
    const [Reject, setReject] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const UserData = JSON.parse(localStorage.getItem('User_model'))
        setUsername(UserData[0]?.first_name)
    }, [])
    function LogOut() {
        Swal.fire({
            title: "Are you sure Want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout..!"
        }).then((result) => {
            if (result.isConfirmed) {
                Adminlogout().then(r => {
                    if (r?.code == 1) {
                        localStorage.removeItem('User_model');
                        Swal.fire({
                            title: "LogOut!",
                            text: "Logout Successfull..",
                            icon: "success"
                        });
                        navigate('/admin/');
                    }
                })
            }
        });
    }

    useEffect(() => {
        getAllData().then(r => {
            if (r?.code == 1) {
                setNEWSDATA(r?.data);
            }
        })
    }, [Approve, Reject])

    function ApproveNews(nid) {
        Swal.fire({
            title: "Are you sure want to approve this NEWSLETTER?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            if (result.isConfirmed) {
                updateNEWS({ news_id: nid, status: 'approved' }).then(r => {
                    if (r?.code == 1) {
                        Swal.fire("NEWSLETTER Approved Successfully..!", "", "success");
                        setApprove((prev) => !prev)
                    }
                })
            } else if (result.isDenied) {
                Swal.fire("NEWSLETTER is not Approved.", "", "info");
            }
        });
    }

    function RejectNews(nid) {
        Swal.fire({
            title: "Are you sure want to Reject this NEWSLETTER?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            if (result.isConfirmed) {
                updateNEWS({ news_id: nid, status: 'rejected' }).then(r => {
                    if (r?.code == 1) {
                        Swal.fire("NEWSLETTER Rejected Successfully..!", "", "success");
                        setReject((prev) => !prev)
                    }
                })
            } else if (result.isDenied) {
                Swal.fire("NEWSLETTER is not Rejected.", "", "info");
            }
        });
    }
    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-2'>
                <div className=''>
                    <h3>NEWSLETTERS WORLD</h3>
                </div>
                <div className=''>
                    <h3 className='d-inline mt-2 me-2'>Welcome: {Username}</h3>
                    <Link to='/admin/dashboard' className='btn btn-primary me-2 mb-2'>Dashboard</Link>
                    <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
                </div>
            </div>
            <div className='row mt-2'>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NEWSDATA?.length > 0 ?
                            NEWSDATA?.map((v, i) =>
                                <tr key={i}>
                                    <td><img src={v?.image_url} style={{ height: '150px', width: '150px' }}></img></td>
                                    <td>{v?.user_name}</td>
                                    <td>{v?.title}</td>
                                    <td>{v?.description}</td>
                                    <td>{v?.status}</td>
                                    <td>
                                        {v?.status == 'pending' ? (
                                            <><button className='btn btn-success' onClick={() => { ApproveNews(v?.id) }}>Approve</button><button className='btn btn-danger ms-2' onClick={() => { RejectNews(v?.id) }}>Reject</button></>
                                        ) : (<h6>You Have Already Responed.</h6>)}
                                    </td>
                                </tr>
                            )
                            : (
                                <tr>
                                    <td colSpan={6}>No Data Found...</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

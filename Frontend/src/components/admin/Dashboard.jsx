import React, { useEffect, useState } from 'react'
import { Adminlogout, AllCount } from '../services/home.services';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Dashboard() {
    const [Username, setUsername] = useState([]);
    const [allCount, setAllCount] = useState([]);
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

    useEffect(()=>{
        AllCount().then(r=>{
          console.log(r?.data);
          setAllCount(r?.data);
        })
      },[])
    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-2'>
                <div className=''>
                    <h3>NEWSLETTERS WORLD</h3>
                </div>
                <div className=''>
                    <h3 className='d-inline mt-2 me-2'>Welcome: {Username}</h3>
                    <Link to='/admin/accept-reject' className='btn btn-primary me-2 mb-2'>Accept/Reject NEWSLETTER</Link>
                    <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
                </div>
            </div>

            <div className='row mt-2'>
        <div className='col-6 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Users</h5>
              <h1 class="card-subtitle mb-2 ">{allCount[0]?.[0]?.user}</h1>
            </div>
          </div>
          </div>
          <div className='col-6 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total NEWSLETTERS</h5>
              <h1 class="card-btitle mb-2 ">{allCount[1]?.[0]?.newsletter}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;', height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Pending NEWSLETTERS</h5>
              <h1 class="card-subtitle mb-2">{allCount[2]?.[0]?.pnews}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Rejected NEWSLETTERS</h5>
              <h1 class="card-subtitle mb-2 ">{allCount[3]?.[0]?.rnews}</h1>
            </div>
          </div>
          </div>
          <div className='col-4 mt-2'>
          <div class="card" style={{width:'18rem;',height:'100px'}}>
            <div class="card-body">
              <h5 class="card-title">Total Accepted NEWSLETTERS</h5>
              <h1 class="card-subtitle mb-2">{allCount[4]?.[0]?.anews}</h1>
            </div>
          </div>
          </div>

        </div>
        </div>
    )
}

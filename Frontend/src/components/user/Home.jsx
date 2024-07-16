import React, { useEffect, useState } from 'react'
import { Userlogout, getNEWS } from '../services/home.services';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {
  const [Username, setUsername] = useState([]);
  const [NEWSDATA, setNEWSDATA] = useState([]);
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
        Userlogout().then(r => {
          if (r?.code == 1) {
            localStorage.removeItem('User_model');
            Swal.fire({
              title: "LogOut!",
              text: "Logout Successfull..",
              icon: "success"
            });
            navigate('/login');
          }
        })
      }
    });
  }

  useEffect(()=>{
    getNEWS().then(r=>{
      if(r?.code == 1){
        setNEWSDATA(r?.data);
      }
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
          <Link to='/my-newsletters' className='btn btn-primary me-2 mb-2'>MY NEWSLETTERS</Link>
          <Link to='/create-newsletter'><button className='btn btn-primary me-2 mb-2'>Create NEWSLETTERS</button></Link>
          <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
        </div>
      </div>

      <div className='row'>
                    {NEWSDATA?.length > 0 ? (
                        <div className='row justify-content-center'>
                            {NEWSDATA?.map((v, i) => (
                                <div className="card col-md-3 m-2" key={i}>
                                    <div className='card-header d-flex'>
                                        <div><img src='http://localhost/img/default.jpg' className='pimage' style={{height:'50px',width:'40px'}}/></div>
                                        <div className='ms-2'>{v?.user_name}<br />{v?.created_time}</div>
                                    </div>
                                      <img src={v?.image_url} className="card-img-top" alt="..." style={{ height: '200px', width: '250px' }} />
                                    <div className="card-body pt-1">
                                        <h4>Title: {v?.title}</h4>
                                        <h4>Description: {v?.description}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <div className='row text-center mt-5'>
                            <div className='col-12 alert alert-warning mt-5'>No News Letters Found</div>
                        </div>
                    )}
                </div>
    </div>
  )
}

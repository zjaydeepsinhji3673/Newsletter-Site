import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DELETENEWS, Userlogout, get_news } from '../services/home.services';
import Swal from 'sweetalert2';

export default function Mynewsletters() {
    const [Username, setUsername] = useState([]);
    const [NEWSDATA, setNEWSDATA] = useState([]);
    const [Delete, setDelete] = useState(false);
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
      get_news().then(r=>{
       if(r?.code == 1){
          setNEWSDATA(r?.data);
        } 
      })
    },[Delete])

    function DeleteNews(nid){
      Swal.fire({
        title: "Are you sure want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          DELETENEWS({news_id:nid}).then(r=>{
            if(r?.code == 1){
              Swal.fire({
                title: "Deleted!",
                text: "Your NewsLetter has been deleted.",
                icon: "success"
              });
              setDelete((prev) => !prev)
            }
          })
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
          <Link to='/create-newsletter'><button className='btn btn-primary me-2 mb-2'>Create NEWSLETTERS</button></Link>
          <Link to='/home'><button className='btn btn-primary me-2 mb-2'>Home Page</button></Link>
          <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
        </div>
      </div>

      <div className='row mt-2'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Image</th>
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
                    <td>{v?.title}</td>
                    <td>{v?.description}</td>
                    <td>{v?.status}</td>
                    <td><button className='btn btn-danger' onClick={() => {DeleteNews(v?.id)}}>Delete</button></td>
                  </tr>
                )
                : (
                  <tr>
                    <td colSpan={5}>No Data Found...</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
    </div>
  )
}

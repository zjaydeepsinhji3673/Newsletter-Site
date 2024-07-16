import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNEWS } from '../services/home.services';

export default function Index() {
    const [NEWSDATA, setNEWSDATA] = useState([]);

    useEffect(() => {
        getNEWS().then(r => {
            if (r?.code == 1) {
                setNEWSDATA(r?.data);
            }
        })
    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 mt-2'>
                    <h3>NEWSLETTERS WORLD</h3>
                </div>
                <div className='col-6 text-end mt-2'>
                    <Link to='/login'><button type='button' className='btn btn-primary me-2'>Create Newsletter</button></Link>
                    <Link to='/login'><button type='button' className='btn btn-primary me-2'>Login</button></Link>
                    <Link to='/register'><button type='button' className='btn btn-primary me-2'>Register</button></Link>
                </div>
            </div>
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
    )
}

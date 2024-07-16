import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getAdminLoginData } from '../services/home.services';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Logina() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const LoginUser = data => {
        getAdminLoginData({ email: data.email, password: data.password }).then(r => {
            if (r.code == 1) {
                localStorage.setItem('User_model', JSON.stringify(r?.data));
                navigate('/admin/dashboard');
                Swal.fire({
                    title: "Welcome back! 😊",
                    text: "You have logged in successfully.",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
            else {
                toast.error(r.data);
            }
        })
    }

    useEffect(() => {
        const UserData = JSON.parse(localStorage.getItem('User_model')) ? JSON.parse(localStorage.getItem('User_model')) : {};
        const role = UserData[0]?.role;
        if (role === 'Admin') {
            navigate('/admin/dashboard');
        }
    }, [])
    return (
        <>
        <div className='container'>
            <div className='row text-center'>
                <h1>Admin Login Here</h1>
            </div>
            <form className='border border-success rounded w-50 mx-auto mt-4 py-4' onSubmit={handleSubmit(LoginUser)}>
                <div className='row'>
                    <div className="form-group col-8 mx-auto mt-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" {...register('email', {
                            required: 'Please Enter Email',
                            pattern: { value: /^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Please Enter Valid Email' },
                        })} placeholder='Enter Your Email' />
                        <p style={{ color: 'red' }}>{errors.email?.message}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className="form-group col-8  mx-auto">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" {...register('password', {
                            required: 'Please Enter Password',
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/, message: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Characte' }
                        })} placeholder='Enter Your Password' />
                        <p style={{ color: 'red' }}>{errors.password?.message}</p>
                    </div>

                </div>

                <div className='row col-8 mx-auto'>
                    <center><button type="submit" className="btn btn-primary login-btn mt-1 mb-2">Login</button></center>
                </div>

            </form>
        </div>
        <ToastContainer />
        </>  
    )
}
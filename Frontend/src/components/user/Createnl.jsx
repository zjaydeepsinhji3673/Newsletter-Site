import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AddNEWS, Userlogout } from '../services/home.services';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

export default function Createnl() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Username, setUsername] = useState([]);
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

    const AddNewsLetter = (data) => {
        console.log(data);
        const formData = new FormData();

        formData.set('description',data?.description);
        formData.set('title',data?.title);
        formData.set('image',data?.image[0]);

        AddNEWS(formData).then(r=>{
            if(r?.code == 1){
                navigate('/home');
                Swal.fire({
                    title: "Newsletter Created.",
                    text: "Your newslatter is created Successfully, when admin is approve then it will publish..",
                    icon: "success"
                });
            }
        })
    }

    function HandleChange(e) {
        let value = e.target.value;
        let extenstion = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
        let name = value.substring(value.lastIndexOf('\\') + 1).toLowerCase();
        let profileImage = document.getElementById('profile-image-preview');
        if (e.target.files[0] && (extenstion === 'png' || extenstion === 'jpeg' || extenstion === 'jpg')) {
            let reader = new FileReader();
            reader.onload = () => {
                profileImage.src = 'http://localhost/img/' + name;
                profileImage.style.display = "inline-block";
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            profileImage.src = 'http://localhost/img/image.png';
            profileImage.style.display = "inline-block";
        }
    }
    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-2'>
                <div className=''>
                    <h3>NEWSLETTERS WORLD</h3>
                </div>
                <div className=''>
                    <h3 className='d-inline mt-2 me-2'>Welcome: {Username}</h3>
                    <Link to='/my-newsletters'><button className='btn btn-primary me-2 mb-2'>MY NEWSLETTERS</button></Link>
                    <Link to='/home'><button className='btn btn-primary me-2 mb-2'>Home Page</button></Link>
                    <button className='btn btn-warning mb-2' onClick={() => LogOut()}>LogOut</button>
                </div>
            </div>
            <div className='text-center mt-2'>
                <h1 style={{ color: 'rebeccapurple' }}>Create your NEWSLETTER here</h1>
            </div>

            <div className='row justify-content-center'>

                <form className='border border-primary col-8' onSubmit={handleSubmit(AddNewsLetter)}>

                    <div className='row mt-2'>
                        <center><img id='profile-image-preview' src='http://localhost/img/image.png' style={{ height: '150px', width: '200px' }}></img></center>
                    </div>
                    <div className='row'>

                        <div className="form-group mt-2">
                            <label htmlFor="title">Title of NEWSLETTER</label>
                            <input type="text" id="title" className="form-control" {...register('title', {
                                required: 'Please Enter newsletter Title',
                                pattern: { value: /^[A-Za-z0-9.-/@#$]+([\s][A-Za-z0-9.-/@#$]+)*[A-Za-z0-9.-/@#$]$/, message: 'Please Enter Valid Values.' },
                            })} placeholder='Enter Newsletter Title' />
                        </div>
                        <p style={{ color: 'red' }}>{errors.title?.message}</p>

                    </div>

                    <div className='row'>

                        <div className="form-group mt-2">
                            <label htmlFor="Thumbnail">Image of NEWSLETTER</label>
                            <input type="file" id="image" className="form-control" accept='.png , .jpg, .jpeg' {...register('image', {
                                required: 'Please Select image',
                                validate: (value) => {
                                    const acceptedFormats = ['jpg', 'png', 'jpeg'];
                                    const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                                    if (!acceptedFormats.includes(fileExtension)) {
                                        return 'Invalid file format. Only jpg,png,jpeg files are allowed.';
                                    }
                                    return true;
                                }
                            })} onChange={(e) => HandleChange(e)} />
                        </div>
                        <p style={{ color: 'red' }}>{errors.image?.message}</p>

                    </div>

                    <div className='row'>

                        <div className="form-group mt-2">
                            <label htmlFor="title">Description of NEWSLETTER</label>
                            <input type="text" id="desc" className="form-control" {...register('description', {
                                required: 'Please Enter description',
                                pattern: { value: /^[A-Za-z0-9.-/@#$]+([\s][A-Za-z0-9.-/@#$]+)*[A-Za-z0-9.-/@#$]$/, message: 'Please Enter Valid Values.' },
                            })} placeholder='Enter Newsletter Description' />
                        </div>
                        <p style={{ color: 'red' }}>{errors.description?.message}</p>

                    </div>

                    <div className='row text-center mb-2'>
                        <center><button type='submit' className='btn btn-success'>Add NEWSLETTER</button></center>
                    </div>
                </form>
            </div>
        </div>
    )
}

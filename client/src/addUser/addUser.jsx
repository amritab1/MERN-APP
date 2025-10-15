import React, { useState } from 'react'
import "./addUser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const addUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target; //update name attribute with new value
        console.log(name, value);
        setUser({ ...user, [name]: value });//user is to copy the  current value of the usestate and update specified property (name) of the new value


    }
    const submitForm = async (e) => {
        e.preventDefault(); //cannot enter empty val or prevents refresh  of the page
        await axios.post("http://localhost:8000/api/user", user).then((response) => {
            //console.log("user created successfully");
            toast.success(response.data.message, { position: 'top-right' });
            navigate("/");
        }).catch((error) => {
            console.log(error);
        })



    }
    return (
        <div className="addUser">
            <Link to="/" type="button" class="btn btn-secondary"> <i className="fa-solid fa-backward"></i> Back</Link>
            <h3>Add New User</h3>

            <form className="addUserForm" onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onChange={inputHandler} name="name" autoComplete='off' placeholder='Enter your name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" onChange={inputHandler} name="email" autoComplete='off' placeholder='Enter your email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" onChange={inputHandler} name="address" autoComplete='off' placeholder='Enter your address' />
                </div>
                <div className='inputGroup'>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default addUser

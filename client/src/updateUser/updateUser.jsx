import React, { useEffect, useState } from 'react'
import "./updateUser.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const updateUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const { id } = useParams();
    const inputHandler = (e) => {
        const { name, value } = e.target; //update name attribute with new value
        console.log(name, value);
        setUser({ ...user, [name]: value });//user is to copy the  current value of the usestate and update specified property (name) of the new value


    }
    const submitForm = async (e) => {
        e.preventDefault(); //cannot enter empty val or prevents refresh  of the page
        await axios.put(`http://localhost:8000/api/update/user/${id}`, user).then((response) => {
            //console.log("user created successfully");
            toast.success(response.data.message, { position: 'top-right' });
            navigate("/");
        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [id]); //effect will run once whenever the id variable changes
    return (
        <div className="addUser">
            <Link to="/" type="button" class="btn btn-secondary"> <i className="fa-solid fa-backward"></i> Back</Link>
            <h3>Update User</h3>

            <form className="addUserForm" onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={user.name} onChange={inputHandler} name="name" autoComplete='off' placeholder='Enter your name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={user.email} onChange={inputHandler} name="email" autoComplete='off' placeholder='Enter your email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" value={user.address} onChange={inputHandler} name="address" autoComplete='off' placeholder='Enter your address' />
                </div>
                <div className='inputGroup'>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default updateUser


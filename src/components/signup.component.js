import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userAdded } from '../app/redux/actions';
import { useDispatch } from 'react-redux';

const initialFormData = Object.freeze({
    username: '',
    phone: '',
    email: '',
    password: '',
    account: ''
});

const Signup = (props) => {
    const dispatch = useDispatch();
    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
          });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'POST',
            url: '/api/signup-submit',
            data: {
                username: formData.username,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                account: formData.account
            },
            withCredentials:true
        }).then((response) => {
            console.log('Response from API call', response && response.data);
            props.history.push({
                pathname: '/profile',
                state: response.data
            });
            const userDetails = {
                'email': response.data.email,
                'accountId': response.data.accountId,
                'userId': response.data.userId,
                'username': response.data.username
            };
            dispatch(userAdded(userDetails));
        }).catch((error) => {
            console.error('Error from API call', error);
        });
    }

    return(
        <React.Fragment>
        <section className="vh-100">
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 text-black">

            <div className="px-1">
                <span className="h1 fw-bold">Tiny URL</span>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form id="signup" onSubmit={handleSubmit}>
                    <h3 className="fw-normal mb-3 pb-3">Sign Up</h3>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" onChange={handleChange} className="form-control form-control-lg"/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" onChange={handleChange} className="form-control form-control-lg"/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" onChange={handleChange} className="form-control form-control-lg"/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChange} className="form-control form-control-lg"/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="account">Account Name</label>
                        <input type="text" id="account" name="account" onChange={handleChange} className="form-control form-control-lg"/>
                    </div>

                    <div className="pt-1 mb-4">
                        <button type="submit" className="btn btn-info btn-lg btn-block">Sign Up</button>
                    </div>

                    <p>Have an account already? <Link to="/" className="link-info">Login</Link></p>
                </form>
            </div>

            </div>
        </div>
        </div>
        </section>
        </React.Fragment>
    );
}

export default Signup; 
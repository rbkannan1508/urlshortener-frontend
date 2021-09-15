import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { userAdded } from '../app/redux/actions';
import { useDispatch } from 'react-redux';

const initialFormData = Object.freeze({
    email: "",
    password: ""
});

const initialErrorMsg = "";

const isLoading = false;

const Login = (props)  => {
    const dispatch = useDispatch();
    const [formData, updateFormData] = React.useState(initialFormData);

    const [errorMsg, triggerMsg] = React.useState(initialErrorMsg);

    const [spinner, isLoadingSpinner] = React.useState(isLoading);

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
          });
    }

    const handleSubmit = (event) => {
        isLoadingSpinner(true);
        event.preventDefault();
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'POST',
            url: '/login-submit',
            data: {
                email: formData.email,
                password: formData.password
            },
            withCredentials:true
        }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            triggerMsg(initialErrorMsg);
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
            isLoadingSpinner(false);
            triggerMsg('Authentication Error');
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
                <form id="login" onSubmit={handleSubmit}>
                    <h3 className="fw-normal mb-3 pb-3">Log in</h3>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" onChange={(event) => handleChange(event)} className="form-control form-control-lg"/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(event) => handleChange(event)} className="form-control form-control-lg"/>
                    </div>

                    {errorMsg}

                    {
                        spinner ? <Loader type="Circles" color="#16fffb" height="75" width="100" /> : <div></div>
                    }

                    <div className="pt-1 mb-4">
                        <button type="submit" className="btn btn-info btn-lg btn-block">Login</button>
                    </div>

                    <p>Don't have an account? <Link to="/signup" className="link-info">Sign up</Link></p>
                </form>
            </div>

            </div>
        </div>
        </div>
        </section>
        </React.Fragment>
    );
}

export default Login; 
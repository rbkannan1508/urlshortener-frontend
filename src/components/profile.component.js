import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";   
import Navigationbar from "./navigationbar.component";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { useSelector } from 'react-redux';

const initialFormData = Object.freeze({
   username: '',
   phone: '',
   email: '',
   password: '',
   originalUrl: ''
});
const isLoading = false;
const setObject = {};
const Profile = (props) => {
   const [formData, updateFormData] = React.useState(initialFormData);
   const [spinner, isLoadingSpinner] = React.useState(isLoading);

   const [showModal, setShow] = useState(false);
   const [showURLModal, setURLShow] = useState(false);

   const handleUserClose = () => setShow(false);
   const handleUserShow = () => setShow(true);

   const handleURLClose = () => setURLShow(false);
   const handleURLShow = () => setURLShow(true);

   const userDetail = useSelector((state) => state.userInfo);

   const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
          });
   }

   const clearForm = (formData) => {
      formData.username = '',
      formData.phone = '',
      formData.email = '',
      formData.password = '',
      formData.originalUrl = ''
      return formData;
   }

   const handleSubmit = (event) => {
      const account_email = userDetail && userDetail.email ? userDetail.email : '';
      if(event.target.name === 'urlsubmit') {
         isLoadingSpinner(true);
         setObject.originalUrl = formData.originalUrl;
         axios.request({
            baseURL: 'http://localhost:3010',
            method: 'POST',
            url: `/shorten-url`,
            data: {
               url: setObject.originalUrl,
               email: account_email
            },
            withCredentials:true
         }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            props.history.push({
               pathname: '/listUrls'
            });
         }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
         });
      } else if(event.target.name === 'usersubmit') {
         isLoadingSpinner(true);
         setObject.username = formData.username;
         setObject.phone = formData.phone;
         setObject.email = formData.email;
         setObject.password = formData.password;
         setObject.account_email = account_email;
         axios.request({
            baseURL: 'http://localhost:3010',
            method: 'POST',
            url: `/add-new-user`,
            data: {
               username: setObject.username,
               phone: setObject.phone,
               email: setObject.email,
               password: setObject.password,
               account_email: setObject.account_email
            },
            withCredentials:true
         }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            props.history.push({
               pathname: '/listUsers'
            });
         }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
         });
      }
      clearForm(formData);
   }

   return (
      <React.Fragment>
         <Navigationbar {...props}></Navigationbar>
         <section className="vh-100">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-sm-6 text-black">
                     <div className="px-1">
                        <span className="h2 fw">Welcome { userDetail && userDetail.username !== null ? userDetail.username : '' }</span>
                     </div>

                     <div className="d-flex" style={{ height: "7vh", marginTop: "5vh" }}>
                        <Button variant="primary" onClick={handleUserShow}>
                           Add New User
                        </Button>
                     </div>
                     
                     <Modal show={showModal} onHide={handleUserClose}>
                     <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                     <form id="login">
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

                     </form>
                     {
                           spinner ? <Loader type="Circles" color="#16fffb" height="75" width="100" /> : <div></div>
                     }
                     </Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={handleUserClose}>
                           Close
                        </Button>
                        <Button variant="primary" name="usersubmit" onClick={handleSubmit}>
                           Save Changes
                        </Button>
                     </Modal.Footer>
                     </Modal>

                     <div className="d-flex" style={{ height: "7vh", marginTop: "5vh" }}>
                        <Button variant="primary" onClick={handleURLShow}>
                           Shorten a URL
                        </Button>
                     </div>

                     <Modal show={showURLModal} onHide={handleURLClose}>
                     <Modal.Header closeButton>
                        <Modal.Title>Shorten a URL</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                     <form id="login">
                        <h3 className="fw-normal mb-3 pb-3">Sign Up</h3>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="originalUrl">URL</label>
                        <input type="text" id="originalUrl" name="originalUrl" onChange={handleChange} className="form-control form-control-lg"/>
                        </div>

                     </form>
                     {
                        spinner ? <Loader type="Circles" color="#16fffb" height="75" width="100" /> : <div></div>
                     }
                     </Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={handleURLClose}>
                           Close
                        </Button>
                        <Button variant="primary" name="urlsubmit" onClick={handleSubmit}>
                           Save Changes
                        </Button>
                     </Modal.Footer>
                     </Modal>

                  </div>
               </div>
            </div>
         </section>
      </React.Fragment>
   );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";   
import axios from 'axios';
import Navigationbar from "./navigationbar.component";
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const initialFormData = Object.freeze({
    search: ""
});

const UrlList = (props) => {
    const isLoading = false;
    const initState = [
        { 
            originalUrl: '', 
            tinyUrl: ''
        }
    ];
    const [formData, updateFormData] = React.useState(initialFormData);
    const [state, setState] = useState(initState);
    const [spinner, isLoadingSpinner] = React.useState(isLoading);

    const userDetail = useSelector((state) => state.userInfo);
    const account_email = userDetail && userDetail.email ? userDetail.email : '';

    useEffect(() => {
        console.log('account_email', account_email);
        getUrlList(account_email);
    }, [])

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
          });
    }

    const getUrlList = (emailDetail) => {
        isLoadingSpinner(true);
        const email = emailDetail;
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'POST',
            url: '/list-all-shortenedurls',
            data: {
                email: email
            },
            withCredentials:true
        }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            let urlList = response.data ? response.data : [];
            setState(urlList);
        }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
        });
    }

    const deleteUrlData = (urlkey) => {
        isLoadingSpinner(true);
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'GET',
            url: `/delete-url/${urlkey}`,
            withCredentials:true
        }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            getUrlList(account_email);
        }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
        });
    }

    const redirectURL = (event) => {
        isLoadingSpinner(true);
        event.preventDefault();
        const urlkey = event.target.id;
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'GET',
            url: `/redirect/${urlkey}`,
            withCredentials:true
        }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            let urlToRedirect = response && response.data;
            window.open(urlToRedirect, '_blank').focus();
        }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
        });
    }

    const searchURL = () => {
        const searchInput = document.getElementById('search-input');
        let inputValue = searchInput.value;
        console.log('inputValue', inputValue);
        isLoadingSpinner(true);
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'GET',
            url: `/search-url`,
            withCredentials:true
        }).then((response) => {
            isLoadingSpinner(false);
            inputValue = '';
            console.log('Response from API call', response && response.data);
        }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
        });
    }

    return(
        <React.Fragment>
        <Navigationbar {...props}></Navigationbar>
        <section className="vh-100">
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 text-black">

            <div className="px-1">
                <span className="h2 fw">URL List</span>
            </div>
            
            <br></br>

            <div className="input-group">
                <input type="search" id="search-input" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" id="search-button" className="btn btn-outline-primary" onClick={searchURL}>search</button>
            </div>

            {
                spinner ? <Loader type="Circles" color="#16fffb" height="75" width="100" /> : <div></div>
            }
            {
                state && state.length > 0 ? 
                <div style={{margin: '50px'}}>
                <table style={{whiteSpace: 'nowrap', width: '100%', border: '1px solid black'}} id='urlData'>
                    <tbody>
                        <tr>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Original URL</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Tiny URL</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Delete</th>
                        </tr>
                        {
                            state.map((item, index) => (
                                <tr key = {index}>
                                    {
                                        <td style={{border: '1px solid black', padding: '10px'}}>
                                            <a href={item.originalUrl} id={item.originalUrl} target='_blank'>{item.originalUrl}</a>
                                        </td>
                                    }
                                    {
                                        <td style={{border: '1px solid black', padding: '10px'}}>
                                            <a href='' id={item.tinyUrl} onClick={(event) => redirectURL(event)}>{item.tinyUrl}</a>
                                        </td>
                                    }
                                    {
                                        <td style={{border: '1px solid black', padding: '10px'}}>
                                            <Button variant='danger' onClick={() => deleteUrlData(item.tinyUrl)}>Delete</Button>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div> :
                <div>
                    <h3 style={{textAlign: 'left', margin: '5px', marginTop: '20px'}}>No Data Available</h3>
                </div>
            }
            

            </div>
        </div>
        </div>
        </section>
        </React.Fragment>
    );
}

export default UrlList; 
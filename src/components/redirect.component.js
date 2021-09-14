import React, {useEffect} from 'react';
import axios from 'axios';

const Redirect = (props) => {
    const text = 'Redirecting...';

    useEffect(() => {
        const pathname = window.location.pathname.substr(10);
        redirectURL(pathname !== null ? pathname : '');
    }, []);

    const redirectURL = (pathname) => {
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'GET',
            url: `/api/redirect/${pathname}`,
            withCredentials:true
        }).then((response) => {
            console.log('Response from API call', response && response.data);
            let urlToRedirect = response && response.data;
            window.open(urlToRedirect, '_self').focus();
        }).catch((error) => {
            console.error('Error from API call', error);
        });
    }
    
    return (
      <div className="App">
        <p> {text} </p>
      </div>
    );
}

export default Redirect;
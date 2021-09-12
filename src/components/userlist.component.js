import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navigationbar from "./navigationbar.component";
import Loader from 'react-loader-spinner';
import store from "../redux/store";

const UserList = (props) => {
    const initState = [
        { 
            id: '', 
            username: '', 
            phone: '',
            email: '',
            password: '',
            roleId:'',
            accountId: ''
        }
    ];
    const isLoading = false;
    const [state, setState] = useState(initState);
    const [spinner, isLoadingSpinner] = React.useState(isLoading);

    const getUserList = () => {
        isLoadingSpinner(true);
        axios.request({
            baseURL: 'http://localhost:3010',
            method: 'GET',
            url: 'listAllUsers',
            withCredentials:true
        }).then((response) => {
            isLoadingSpinner(false);
            console.log('Response from API call', response && response.data);
            let userList = response.data ? response.data : [];
            console.log('userList', userList);
            setState(userList);
        }).catch((error) => {
            isLoadingSpinner(false);
            console.error('Error from API call', error);
        });
    }

    useEffect(() => {
        const state = store.getState();
        console.log('state', state);
        const stateObject = {};
        if(state && state[0]) {
            stateObject.userId = state[0].userId;
            stateObject.accountId = state[0].accountId;
            stateObject.email = state[0].email;
            stateObject.username = state[0].username;
        }
        console.log('stateObject', stateObject);
        getUserList();
    }, [])

    return(
        <React.Fragment>
        <Navigationbar {...props}></Navigationbar>
        <section className="vh-100">
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 text-black">

            <div className="px-1">
                <span className="h2 fw">User List</span>
            </div>
            {
                spinner ? <Loader type="Circles" color="#16fffb" height="75" width="100" /> : <div></div>
            }
            {
                state && state.length > 0 ? 
                <div style={{margin: '50px'}}>
                <table style={{width: '100%', border: '1px solid black'}} id='urlData'>
                    <tbody>
                        <tr>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>ID</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Username</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Phone</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Email</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Role ID</th>
                            <th style={{border: '1px solid black', textAlign: 'center'}}>Account ID</th>
                        </tr>
                        {
                            state.map((item, index) => (
                                <tr key = {index}>
                                    {
                                        Object.values(item).map((val, idx) => (
                                            <td key={idx} style={{border: '1px solid black', padding: '10px'}}>{val}</td>
                                        ))
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

export default UserList; 
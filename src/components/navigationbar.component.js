import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { clearState } from '../app/localStorage/localStorage';
import { useSelector } from 'react-redux';

const Navigationbar = (props) => {

    const initialName = '';
    const [name, setName] = React.useState(initialName);

    const userDetail = useSelector((state) => state.userInfo);

    const logoutFunction = () => {
        console.log('token', Cookies.get('token'));
        Cookies.remove('token');
        clearState();
        props.history.push('/');
    }

    useEffect(() => {
        const username = userDetail && userDetail.username ? userDetail.username : '';
        setName('Welcome ' + username);
    });

    const redirectTab = (event) => {
        event.preventDefault();
        if(event.target.id === 'user-list') {
            props.history.push('/listUsers');
        } else if(event.target.id === 'url-list'){
            props.history.push('/listUrls');
        }
    }

    return(
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/profile">Tiny URL</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href='' id='user-list' onClick={(event) => redirectTab(event)}>Users List</Nav.Link>
                                <Nav.Link href='' id='url-list' onClick={(event) => redirectTab(event)}>URLs List</Nav.Link>
                            </Nav>
                            <Nav>
                            <NavDropdown title={name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/editProfile">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutFunction}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default Navigationbar;
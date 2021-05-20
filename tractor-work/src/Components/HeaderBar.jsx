import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import '../Styles/AdminPanel.css';

export default function HeaderBar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand ><Link to="/Admin/" className="links">Admin Panel</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                
                   
                    </Nav>
                    <Nav className="linkParent">
                   <Nav.Link><Link to="/" className="linkLogout">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </div>
    )
}

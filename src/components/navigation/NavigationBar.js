import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export const NavigationBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/">Jason's Personal Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                    <NavDropdown title="Probability" id="collapsible-nav-dropdown">
                        <NavDropdown.Item href="/gacha">Gacha Simulator</NavDropdown.Item>
                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}
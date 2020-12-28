import React from 'react';
import { useGlobalContext } from '../../context';
import { Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';

export const NavigationBar = () => {
    const { theme, toggleTheme } = useGlobalContext();

    return (
        <Navbar collapseOnSelect expand="lg" bg={theme === 'dark-theme' ? "dark" : "light"} variant={theme === 'dark-theme' ? "dark" : "light"} sticky="top">
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
                <Form inline>
                    <Button variant="outline-success" onClick={toggleTheme}>Toggle Theme</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );

}
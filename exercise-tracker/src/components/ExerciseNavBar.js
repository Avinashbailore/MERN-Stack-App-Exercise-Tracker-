import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap'

const ExerciseNavBar = () => {
    return(
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Exercise Tracker</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Exercises</Nav.Link>
                    <Nav.Link href="/create">Create Exercise Log</Nav.Link>
                    <Nav.Link href="/user">Create User</Nav.Link>
                </Nav>
            </Navbar>

        </div>
    )
}

export default ExerciseNavBar
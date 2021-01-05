import React, {useState} from 'react';
import axios from 'axios'
import { Form, Row, Col, Card, Button } from 'react-bootstrap'


const CreateUser = () => {

    const [newUser, setNewUser] = useState('')


    const addNewUser = () => {
        const user = {
            username: newUser
        }
        axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                setNewUser('');
                window.location = '/create';
            });
    }

    return(
        <div className="container mt-3">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>Create New User </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>
                                                UserName:
                                            </Form.Label>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Control type="text" value={newUser} onChange={(e)=> setNewUser(e.target.value)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-right mt-2">
                                            <Button className="btn-success text-right" disabled={!newUser} onClick={addNewUser}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}

export default CreateUser
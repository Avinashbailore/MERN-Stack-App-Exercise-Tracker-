import React, {useEffect, useState} from 'react';
import { Form, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {

    const {id} = useParams();

    const [appReady, setAppReady] = useState(false);

    const [users, setUsers] =useState([]);
    const [username, setUserName] =useState('');
    const [description, setDescription] =useState('');
    const [duration, setDuration] =useState('');
    const [date, setStartDate] = useState(new Date());

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+id)
            .then((res)=> {
                const {username, duration, date, description} = res.data;
                setUserName(username);
                setDescription(description);
                setDuration(duration);
                setStartDate(new Date(date));
            })
            .catch((err)=> console.log(err));
        
        axios.get('http://localhost:5000/users/')
            .then(response => {
              if (response.data.length > 0) {
               setUsers(response.data);
               setAppReady(true)
              }
            })
            .catch((error) => {
              console.log(error);
            })
    },[])


    const updateExercise = () => {
        const exercise = { username, duration, date, description}

        axios.post('http://localhost:5000/exercises/update/'+ id, exercise)
            .then((res)=> {
                window.location = '/'
            });
        
        
    }

    return(
        <div className="container mt-3">
            {   appReady ? 
                (<Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Create New Exercise</Card.Header>
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
                                                <Form.Control as="select" value={username} onChange={(e) => setUserName(e.target.value)}>
                                                    <option value=''></option>
                                                    {users.map(({username}, index)=>{
                                                        return <option key={`${username}-${index}`} value={username}>{username}</option>
                                                    })}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <Form.Label>
                                                    Description:
                                                </Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <Form.Label>
                                                    Duration (in Minutes):
                                                </Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 mb-2">
                                            <Col md={3}>
                                                <Form.Label>
                                                    Date (in Minutes):
                                                </Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <DatePicker selected={date} onChange={date => setStartDate(date)} dateFormat="MMM dd yyyy "/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-right mt-2">
                                                <Button className="btn-success text-right" onClick={updateExercise}>Submit</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>) : 
                        (<div className='text-center'>
                            <Spinner animation="border" role="status" />
                        </div>)
            }
        </div>
    )
}

export default EditExercise
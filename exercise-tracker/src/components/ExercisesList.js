import React, {useEffect, useState} from 'react';
import { Form, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import filter from 'lodash/filter'

const ExercisesList = () => {

    const [exerciseList, setExerciseList] = useState([]);
    const [appReady, setAppReady] = useState(false);
    const history = useHistory();

    useEffect(()=> {
        axios.get('http://localhost:5000/exercises/')
            .then((res) => {
                setExerciseList(res.data)
                setAppReady(true);
            });
    },[]);


    const editExercise = (id) => {
        let path = `/edit/${id}`; 
        history.push(path);
    }

    const deleteExercise = (id) =>  {
        axios.delete('http://localhost:5000/exercises/'+id)
          .then(response => { console.log(response.data)});
        const state = exerciseList.filter(({_id}) => id!=_id);
        setExerciseList(state);
        
    }

    return(
        <div className="container mt-3">
                {appReady ? (
                    <div>
                        <h3>Logged Exercises</h3>
                        <Table striped bordered hover >
                            <thead className="thead-light">
                                <tr>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exerciseList.map(({_id, username, description, duration, date})=> (
                                    <tr key={_id}>
                                        <td>{username}</td>
                                        <td>{description}</td>
                                        <td>{duration}</td>
                                        <td>{new Date(date).toString().substring(0, 10)}</td>
                                        <td><BsPencil onClick={() => editExercise(_id)} className="icon mr-2"/><BsFillTrashFill onClick={() => deleteExercise(_id)} className="icon ml-2"/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div> ) : (
                        <div className='text-center'>
                            <Spinner animation="border" role="status" />
                        </div>)
                }
            </div> 
    )
}

export default ExercisesList
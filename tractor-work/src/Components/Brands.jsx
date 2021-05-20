import React,  { useState } from 'react'
import '../Styles/AdminPanel.css';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
// import cx from 'classname';

export default function Brands() {
    const [getName, setName] = useState("None");
    const [getMessage, setMessage] = useState("");
    const notify = () => toast(getMessage);

    const url = "http://localhost:5000/";
    const onCLick =()=>{
        const bodyData={
            "name":getName,
            "contacts":1
        }
        axios.post(url+'brand/add',bodyData)
        .then((res)=>{
            setMessage(bodyData.name+" added sucessfully.")
            notify();
        }).catch(
            (err)=>{
                const response = err.response.data 
                // setMessageType("Error");
                setMessage(response)
                notify();
            }
        )
    }
    return (
        <div className="main">
        <div className="main-container">
            <Container>
            <Row className="justify-content-md-center">
            
                <Col md="auto" sm="auto" lg="auto">
                 
                        <Form>
                        <fieldset >
                            <Form.Group>
                            <Form.Label htmlFor="TextInput">Brand name</Form.Label>
                            <Form.Control id="TextInput" onChange={event => setName(event.target.value)} placeholder="Enter Brand name" />
                            </Form.Group>
                           
                           
                            <Button onClick={onCLick}>Submit</Button>
                        </fieldset>
                        </Form>
                    
                 
                    </Col>
              
            </Row>

            </Container>
   </div>
              <ToastContainer />
</div>
    )
}

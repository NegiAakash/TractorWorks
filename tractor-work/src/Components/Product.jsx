import React,  { useState, useEffect } from 'react'
import '../Styles/AdminPanel.css';
import axios from 'axios';
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
// import cx from 'classname';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
    const [getName, setName] = useState("None");
    const [getID, setID] = useState("Eicher");
    const [getBrandID, setBrandID] = useState(-1);
    const [getMessage, setMessage] = useState("");
    const brands = [];
    const [getBrands, setBrands]= useState([]);
    // const [show, setShow] = useState(false);
    const notify = () => toast(getMessage);

    useEffect(() => {    
        getCategory();
      }, setBrands);

    const url = "http://localhost:5000/";
 
    const onCLick = async()=>{
        getBrandId(getID)
        const bodyData={
            "name":getName,
            "brand_id":(getBrandID)
        }

        await axios.post(url+'tractor/add',bodyData)
        .then((res)=>{
            setMessage(bodyData.name+" added sucessfully.")
            notify();
        }).catch(
            (err)=>{
                const response = err.response.data 
                setMessage(response)
                notify();
            }
        )
    }
    
    const getBrandId=  async()=>{
        try{
        await axios.get(url+'brand/'+getID).then((res)=>{
   
            setBrandID(res.data[0]._id);
        })
        
        

        }catch(err){console.log("Error" +err+getID)}
       
        
    }

    

    const getCategory=async ()=>
    {
        await axios.get(url+'brand/all')
        .then((res)=>{
            const data = res.data;
            
            for (let i = 0; i < data.length; i++) {
                const obj = {name:'', id:''}
                obj.name = data[i].name;
                obj.id = data[i]._id;
                brands.push(obj);
            }
            setBrands(brands);
        }).catch(
            (err)=>{
                console.log('Error : '+err);
            }
        )
    }

    

    return (
<div className="main">
        <div className="main-container  ">
            <Container>
            <Row className="justify-content-md-center">
            
                <Col md="auto" sm="auto" lg="auto">
                 
                        <Form>
                        <fieldset >
                            <Form.Group>
                            <Form.Label htmlFor="TextInput">Tractor name</Form.Label>
                            <Form.Control id="TextInput" onChange={event => setName(event.target.value)} placeholder="Enter tractor name" />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label htmlFor="Select">Tractor Brand name</Form.Label>
                            <Form.Control as="select" onChange={event => {setID(event.target.value)}}  id="Select">
                                {getBrands.map((data)=>
                                <option  key={data.id}>{data.name}</option>
                                )}
                            </Form.Control>
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

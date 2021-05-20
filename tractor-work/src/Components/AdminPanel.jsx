import React, { useEffect, useState } from "react";
import "../Styles/AdminPanel.css";
import axios from "axios";
// import cx from 'classname';
import Brands from "./Brands";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./Product";
import HeaderBar from "./HeaderBar";
import { Button, ButtonGroup, Table, Modal } from "react-bootstrap";

export default function AdminPanel() {
  const [getTractor, setTractor] = useState([]);
  const tractor = [];
  const [getBrands, setBrands] = useState([]);
  const [getBrandNames, setBrandNames] = useState([]);
  const [prod, setProdShow] = useState(false);
  const [brand, setBrandShow] = useState(false);
  const brandData = [];
  //TODO make changable links

  const url = "http://localhost:5000/";
  useEffect( () => {
    
    async function allProducts() {
      const req = await axios.get(url+'tractor/all');
      setTractor(req.data);
      for(let i=0;i<req.data.length; i++)
      {
        getBrandName(req.data[i].brand_id);
      }
      return req;
    }

    async function allBrands() {
      const req = await axios.get(url+'brand/all');
      setBrands(req.data);
      return req;
    }
    allBrands();
    allProducts();
    
 
  }, []);

 

  const deleteItem = async (id) => {
    await axios
      .delete(url + "tractor/remove/" + id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };






const getBrandName = async (brandId) =>
{
    var id = brandId;
    const length =getBrands.length;

  for(let i=0; i<length; i++)
        {
            
            if(getBrands[i]._id === id)
            {
                brandData.push(getBrands[i].name);
            }
            
        }
        setBrandNames(brandData);
}

 

  return (
    <div>
      <Router>
        <HeaderBar />
        <section>
          <div className="AddBtns">
            <Button
              variant="outline-primary"
              className="addBtn"
              onClick={() => setProdShow(true)}
            >
              Add Product
            </Button>
            <Button
              variant="outline-primary"
              className="addBtn"
              onClick={() => setBrandShow(true)}
            >
              Add Brand
            </Button>
          </div>
          <Switch>
            <Route path="/Admin/" exact>
              <div className="adminContainer">
                <Table
                  striped
                  bordered
                  hover
                  responsive="lg"
                  variant="dark"
                  className="adminContainer"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tractor Name</th>
                      {/* <th>Brand Name</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTractor.map((data, index) => (
                      <tr key={data._id}>
                        <td>{data._id}</td>
                        <td>{data.name}</td>
                       
                        <td className="buttonGrp">
                          <ButtonGroup size="sm" aria-label="action-buttons">
                            <Button variant="outline-info">Edit</Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => {
                                deleteItem(data._id);
                              }}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Route>
            <Route path="/Admin/addBrands" exact>
              <Brands />
            </Route>
            <Route path="/Admin/addProducts">
              <Product />
            </Route>
          </Switch>
        </section>
      </Router>

      <Modal
        size="lg"
        show={brand}
        onHide={() => setBrandShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Brands
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Brands />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={prod}
        onHide={() => setProdShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Products
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Product />
        </Modal.Body>
      </Modal>
    </div>
  );
}

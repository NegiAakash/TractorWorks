import { React, useState, useEffect } from "react";
import "../Styles/App.css";
import axios from "axios";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import { Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav, ListGroup } from "react-bootstrap";
import CardComp from "./CardComp";
import BrandsCard from "./BrandsCard";

export default function Header() {
  const [getSearchEnabled, setSearchEnabled] = useState(false);
  const [getSearchBar, setSearchBar] = useState("");
  const [getSearchData, setSearchData] = useState([]);
  const [getTractor, setTractor] = useState([]);
  const [getBrands, setBrands] = useState([]);
  const tractor = [];
  const brands = [];

  const url = "http://localhost:5000/";
  useEffect(() => {
    getData();
    getBrandsData();
  },[]);

  const getData = async () => {
    await axios.get(url + "tractor/all").then((data) => {
      var length = data.data.length > 5 ? 5 : data.data.length;

      for (var i = 0; i < length; i++) {
        const obj = data.data[i];
        tractor.push(obj);
      }
      setTractor(tractor);
    });
  };

  const getBrandsData = async () => {
    await axios.get(url + "brand/all").then((data) => {
      var length = data.data.length > 7 ? 7 : data.data.length;

      for (var i = 0; i < length; i++) {
        const obj = data.data[i];
        brands.push(obj);
      }
      // console.log(brands);
      setBrands(brands);
    });
  };

  const getTractorName = async () => {
    await axios.get(url + "tractor/name/" + getSearchBar).then((data) => {

      if(data.data.length==0)
      {
        tractor.push(0);
      }
      for (var i = 0; i < data.data.length; i++) {
        const obj = data.data[i];
        tractor.push(obj);
      }

      // await  axios.get(url+'brand/'+getSearchBar)
      // .then((data)=>{
      //     for (var i = 0; i < data.data.length; i++) {
      //         const obj = data.data[i];
      //         tractor.push(obj)

      //     }
      setSearchData(tractor);
      // console.log(getSearchData, tractor);
    });
  };

  const searchClicked = () => {
    setSearchEnabled(true);
    getTractorName();
  };

  return (
    <div className="body">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/Admin/" className="logo">
            Tractor Works
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className="linkParent">
            {/* <Nav.Link><Link to="/Admin/addBrands" className="links">Brands</Link></Nav.Link>
                    <Nav.Link><Link to="/Admin/addProducts" className="links">Products</Link></Nav.Link> */}
            <Nav.Link className="links">Home</Nav.Link>
            <Nav.Link className="links">About</Nav.Link>
            <Nav.Link className="links">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="mast">
        <div className="middle">
          <div className="typo">
            <p>TRACTORWORKS</p>
          </div>
          <div className="search">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(event) => {
                  setSearchBar(event.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  className="searchBtn"
                  onClick={searchClicked}
                >
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      </div>
      <section className="mainSection">
        {getSearchEnabled == true ? (
          <div className="searchData">
           {getSearchData.map((data)=>(
             <div className="searchResult">
               {data == 0?<h3>Empty</h3>:
               
                 <CardComp data={data} key={data.id}/>
               
               } 
             </div>
           ))}
          </div>
        ) : (
          <div>
            <section className="allProds">
              <div className="prodTitleContainer">
                <p className="secTitle">All Products</p>
              </div>
              <div className="prodBody">
                {getTractor.map((data) => (
                  <div className="prodCard" key={data.id}>
                    <CardComp data={data} key={data._id} />
                  </div>
                ))}
              </div>
            </section>
             {/* ############# BRAND Section ######################## */}
            <section>
              <section className="allBrands">
                <div className="brandTitleContainer">
                  <p className="secTitleBrands">All Brands</p>
                </div>
                <div className="brandsCardSection">
                  {getBrands.map((data) => (
                    <BrandsCard
                      className="brandCard"
                      data={data}
                      key={data.id}
                    />
                  ))}
                </div>
              </section>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}

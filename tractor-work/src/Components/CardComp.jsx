import React from 'react';
import { Button, Badge } from 'react-bootstrap';
// import {Card} from 'react-bootstrap';
import "../Styles/App.css";

export default function CardComp(props) {
  // console.log(props.data.name)
    return (
        <div>
            {/* <div className="card">
                <img src="images/JD.jpg" alt="BigCo Inc. logo"/>
                <span className="name">{props.name}</span>
            </div> */}

   

        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="images/JD.jpg"
                alt={props.data.name}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {props.data.name}{" "}
              <span className="tag is-primary">$2400</span>
            </b>
            <br/>
            {1 > 0 ? (
              <Badge pill variant="success">
              Available
            </Badge>
            ) : (
              <Badge pill variant="danger">
              Out-of-stock
            </Badge>
            )}
             </div>
            <div className="AddToCart">
              <Button
                className="button"
                size="sm"
                onClick={() =>
                  console.log("Clicked")
                }
              >
                Add to Cart
              </Button>
            </div>
         
        </div>
</div>
 
    )
}

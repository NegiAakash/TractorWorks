import React from "react";
import "../Styles/card.css";
import { Col, Image } from "react-bootstrap";

export default function BrandsCard(props) {
  const data = props.data;

  const nameShortner=(name)=>{
    var str = name.split(" ");
    var result = "";
    if(str.length > 1)
    {
        for(let i=0; i<str.length; i++)
        {
            result += str[i][0];
        }
        return result;
    }
    result = str[0];
    return result;
  }

  return <div className="brandCard">
      {nameShortner(data.name)}
      </div>;
}

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function ProductDetails() {
  let [data, setData] = useState([]);
  let { id } = useParams();
  async function fetchData() {
    try {
      let response = await fetch(`https://dummyjson.com/products/${id}`);
      let result = await response.json();
      setData(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <h4>{data.title}</h4>
        <div>{data.description}</div>
        <div>{data.category}</div>
        <img src={data.thumbnail}/>
      </div>
    </div>
  );
}

export default ProductDetails;

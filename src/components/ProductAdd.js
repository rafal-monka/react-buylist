import React, { useState } from "react";
import ProductDataService from "../services/ProductDataService";

const ProductAdd = props => {
    var initProduct = {
      name: "",
      category: "",
      shop: "",
      unit: "SZT",
      price: ""
    }

    const [manualItem, setManualItem] = useState(initProduct);

    const handleInputChange = (e) => setManualItem({
      ...manualItem,
      [e.currentTarget.name]: e.currentTarget.value
    })

    const addProduct = () => {
        if (manualItem.name === "" || manualItem.category === "") {
          alert("Name and category are required.");
          return;
        }
        ProductDataService.create(manualItem)
        .then(response => {
            props.refresh();
        })
        .catch(e => {
            console.log(e);
        });
  }

  return (
    <div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name..."
              required
              value={manualItem.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="Category..."
              required
              value={manualItem.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="shop"
              placeholder="Shop..."
              required
              value={manualItem.shop}
              onChange={handleInputChange}
              name="shop"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="unit"
              placeholder="Unit..."
              value={manualItem.unit}
              onChange={handleInputChange}
              name="unit"
            />
          </div>
        </div>

        <div className="row"> 
          <div className="col">
            <input
              type="number"
              className="form-control"              
              id="price"
              placeholder="Price..."
              value={manualItem.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>
        </div>

        <br/>
        <button onClick={addProduct} className="btn btn-success">
          Add
        </button>
        <br/><br/>  

    </div>
    );
  };
  
  export default ProductAdd;
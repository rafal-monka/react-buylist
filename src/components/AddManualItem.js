import React, { useState } from "react";
import ItemsDataService from "../services/ItemDataService";

const AddManualItem = props => {
    var initItem = {
      parentid: props.parentId,
      name: "",
      category: "",
      shop: "",
      source: "MANUAL",//###const
      unit: "",
      price: "",
      amount: ""      
    }

    const [manualItem, setManualItem] = useState(initItem);

    const handleInputChange = (e) => setManualItem({
      ...manualItem,
      [e.currentTarget.name]: e.currentTarget.value
    })

    const addManualItemToList = () => {
      if (manualItem.name === "" || manualItem.category === "") {
        alert("Name and category are required.");
        return;
      }
        ItemsDataService.create(manualItem)
        .then(response => {
            props.refresh();
        })
        .catch(e => {
            console.log(e);
        });
  }

  return (
    <div>
        <h4>Add item manually</h4>        
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

          <div className="col">
            <input
              type="number"
              className="form-control"              
              id="amount"
              placeholder="Amount..."
              value={manualItem.amount}
              onChange={handleInputChange}
              name="amount"
            />
          </div>

          <div className="col">
            {manualItem.price && manualItem.amount ? Math.round(manualItem.price * manualItem.amount * 100) / 100: ""}
          </div>

          <div className="col">
            <button onClick={addManualItemToList} className="btn btn-success">
              Add item
            </button>
          </div>
        </div>
        <br/>
    </div>    
    );
  };
  
  export default AddManualItem;
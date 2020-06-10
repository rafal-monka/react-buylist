import React, { useState } from "react";
import { useHistory  } from "react-router-dom";
import ListDataService from "../services/ListDataService";

const BuyListAdd = () => {

  const initBuyList = {
      name: "",
      description: ""
  }
  const [buyList, setBuyList] = useState(initBuyList);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBuyList({ ...buyList, [name]: value });
  };

  const saveBuyList = () => {
    var data = {
      name: buyList.name,
      type: "BUYLIST",
      description: buyList.description,
      active: 1
    };

    ListDataService.create(data)
      .then(response => {
        setBuyList({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          active: response.data.active
        });
        // setSubmitted(true);
        history.push(process.env.PUBLIC_URL+"/buylists")
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          {/* <button className="btn btn-success" onClick={newBuyList}>
            Add new list
          </button> */}
        </div>
      ) : (
        <div>
          <h4>Add new buy list</h4>
        
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={buyList.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={buyList.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveBuyList} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyListAdd;
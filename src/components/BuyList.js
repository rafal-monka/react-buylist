import React, { useState, useEffect } from "react";
import ListDataService from "../services/ListDataService";

const BuyList = props => {
  const initialBuyListState = {
    id: null,
    name: "",
    description: "",
    active: false
  };
  const [currentBuyList, setCurrentBuyList] = useState(initialBuyListState);
  const [message, setMessage] = useState("");

  const getBuyList = id => {
    ListDataService.get(id)
      .then(response => {
        setCurrentBuyList(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBuyList(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBuyList({ ...currentBuyList, [name]: value });
  };

  const updateStatus = status => {
    var data = {
      id: currentBuyList.id,
      name: currentBuyList.title,
      description: currentBuyList.description,
      active: status
    };

    ListDataService.update(currentBuyList.id, data)
      .then(response => {
        setCurrentBuyList({ ...currentBuyList, active: status });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBuyList = () => {
    ListDataService.update(currentBuyList.id, currentBuyList)
      .then(response => {
        setMessage("The Buy List was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBuyList = () => {
    ListDataService.remove(currentBuyList.id)
      .then(response => {
        props.history.push(process.env.PUBLIC_URL+"/buylists");
      })
      .catch(e => {
        console.log(e);
      });
  };

  

  return (
    <div>
      {currentBuyList ? (
        <div className="edit-form">
          <h4>Shopping List</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentBuyList.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBuyList.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBuyList.active ? "Active" : "Not active"}
            </div>
          </form>

          {currentBuyList.active ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(0)}
            >
              Deactivate
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(1)}
            >
              Activate
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBuyList}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBuyList}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Buy List...</p>
        </div>
      )}
    </div>
  );
};

export default BuyList;
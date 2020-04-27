import React, { useState, useEffect } from "react";
import ListDataService from "../services/ListDataService";
import { Link, useHistory  } from "react-router-dom";

const BuyLists = () => {
  
  const [buyLists, setBuyLists] = useState([]);
  const [currentBuyList, setCurrentBuyList] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const history = useHistory();

  useEffect(() => {
    retrieveBuyLists();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveBuyLists = () => {
    ListDataService.getAll("BUYLIST")
      .then(response => {
        setBuyLists(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveBuyList = (buyList, index) => {
    setCurrentBuyList(buyList);
    setCurrentIndex(index);
  };

  const addBuyList = () => {
    history.push("/buylists/add");
  }

  const findByName = () => {
    ListDataService.findByName(searchName)
      .then(response => {
        setBuyLists(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="row">
      
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>

  
      <div className="col-md-10">
        <h4>Buy Lists</h4>

        <button className="m-3 btn btn-sm btn-success" onClick={addBuyList}>
          Add buy list
        </button>

        <ul className="list-group">
          {buyLists &&
            buyLists.map((buyList, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBuyList(buyList, index)}
                key={index}
              >
                {buyList.name} - {buyList.description} - {buyList.createdAt}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBuyLists}
        >
          Remove All
        </button> */}

      </div>
      <div className="col-md-6">
        {currentBuyList ? (
          <div>
            <h4>Buy List</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentBuyList.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBuyList.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBuyList.active ? "Active" : "Pending"}
            </div>

            <Link
              to={"/buylists/" + currentBuyList.id}
              className="badge badge-warning"
            >
              Edit
            </Link>

            <Link
              to={"/creator/buylist/" + currentBuyList.id}
              className="badge badge-info"
            >
              Items
            </Link>

            <Link
              to={"/buylists/execute/" + currentBuyList.id}
              className="badge badge-success"
            >
              Execute
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Buy List...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyLists;

// const removeAllBuyLists = () => {
//   if (window.confirm("Czy na pewno usunąć wszystkie listy?")) {
//     ListDataService.removeAll()
//       .then(response => {
//         //console.log(response.data);
//         refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }
// };

  // const refreshList = () => {
  //   retrieveBuyLists();
  //   setCurrentBuyList(null);
  //   setCurrentIndex(-1);
  // };
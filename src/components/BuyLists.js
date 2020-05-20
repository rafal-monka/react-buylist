import React, { useState, useEffect } from "react";
import ListDataService from "../services/ListDataService";
import { useHistory  } from "react-router-dom";

const BuyLists = () => {
  
  const [buyLists, setBuyLists] = useState([]);
  const [currentBuyList, setCurrentBuyList] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("Loading...");

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
        setMessage("");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveBuyList = (buyList, index) => {
    history.push(process.env.PUBLIC_URL+"/buylists/creator/"+buyList.id);
    // setCurrentBuyList(buyList);
    // setCurrentIndex(index);
  };

  const addBuyList = () => {
    history.push(process.env.PUBLIC_URL+"/buylists/add");
  }

  const findByName = () => {
    ListDataService.findByName(searchName)
      .then(response => {
        setBuyLists(response.data);
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
          Add new list
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
                {buyList.name} - {buyList.description} 
              </li>
            ))}
        </ul>

        {/* - {buyList.active ? "Active" : "Not active"} / {buyList.createdAt} */}
        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBuyLists}
        >
          Remove All
        </button> */}

      </div>

      
      <div className="col-md-6">
        <br/>
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
              {currentBuyList.active ? "Active" : "Not active"}
            </div>

            <div className="row">
              <div className="col">
              <button className="m-3 btn btn-sm btn-info" onClick={()=>{history.push(process.env.PUBLIC_URL+"/buylists/"+currentBuyList.id);}}>
                  Edit
                </button>
                <button className="m-3 btn btn-sm btn-primary" onClick={()=>{history.push(process.env.PUBLIC_URL+"/buylists/creator/"+currentBuyList.id);}}>
                  Items
                </button>
                <button className="m-3 btn btn-sm btn-warning" onClick={()=>{history.push(process.env.PUBLIC_URL+"/buylists/execute/"+currentBuyList.id);}}>
                  Execute
                </button>
              </div>  
            </div>          

          </div>
        ) : (
          <div>
            <br />    
            {message}        
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
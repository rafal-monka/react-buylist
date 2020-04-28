import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemsExecute from "./ItemsExecute";
import ListDataService from "../services/ListDataService";
import ItemDataService from "../services/ItemDataService";

const BuyListExecute = props => {
    var buyListId = props.match.params.id;

    const buyListObj = {
        id: buyListId,
        name: "",
        description: "",
        active: false
    }

    const [buyList, setBuyList] = useState(buyListObj); 
    const [items, setItems] = useState([]);
    // const [categories, setCategories] = useState([]);
       
    useEffect(() => {
        retrieveBuyList(buyListId);
        retrieveItems(buyListId);
    }, [buyListId]);

    //retrieve buy list info
    const retrieveBuyList = id => {
        ListDataService.get(id) 
        .then(response => {
            setBuyList(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    //retrieve items of buy list
    const retrieveItems = buylistid => {        
        ItemDataService.getItems(buylistid) 
        .then(response => {
            setItems(response.data);
            //console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

          //refresh both lists
    const refreshList = () => {
        retrieveItems(buyListId);
    }

    return (
        <div>
            <button className="m-3 btn btn-sm btn-primary" onClick={()=>{props.history.push("/creator/buylist/"+buyListId)} }>
                  Create list
            </button>

            <h3>List #{buyList.id} {buyList.name} {buyList.description}</h3>
            
            <div className="row">
                <div className="col">   
                    <ItemsExecute items={items} buyListId={buyListId} refresh={refreshList} status="ACTIVE"/>
                </div>
            </div>

            <div className="row">
                <div className="col">   
                    <ItemsExecute items={items} buyListId={buyListId} refresh={refreshList} status="BOUGHT"/>
                </div>
            </div>
            
        </div>
    );
};

export default BuyListExecute;
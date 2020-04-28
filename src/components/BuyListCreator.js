import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Items from "./Items";
import Products from "./Products";
import AddManualItem from "./AddManualItem";
import ChooseRecipe from "./ChooseRecipe";
import ListDataService from "../services/ListDataService";
import ItemDataService from "../services/ItemDataService";
import ProductDataService from "../services/ProductDataService";

const BuyListCreator = props => {
    var buyListId = props.match.params.id;

    const buyListObj = {
        id: buyListId,
        name: "",
        description: "",
        active: false
    }

    const [buyList, setBuyList] = useState(buyListObj); 
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]); 
    // const [categories, setCategories] = useState([]);
       
    useEffect(() => {
        retrieveBuyList(buyListId);
        retrieveItems(buyListId);
        retrieveProducts(buyListId);
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

    //retrieve products not on list
    const retrieveProducts = buylistid => {
        ProductDataService.getProductsNotOnList(buylistid)
          .then(response => {
            setProducts(response.data);
            // const tmp = [...new Set( response.data.map(obj => obj.category)) ];
            // setCategories(tmp);
          })
          .catch(e => {
              console.log(e);
          });
      };
    
      //refresh both lists
    const refreshLists = () => {
        //console.log("refreshLists"+new Date());
        retrieveItems(buyListId);
        retrieveProducts(buyListId);
    }
    return (
        <div>

            <button className="m-3 btn btn-sm btn-warning" onClick={()=>{props.history.push("/buylists/execute/"+buyListId)} }>
                  Execute list
            </button>
{/* <button onClick={()=>refreshLists()}>Refresh</button> */}

            <h3>List #{buyList.id} {buyList.name} {buyList.description}</h3>
            
            <div className="row">
                <div className="col">
                    <AddManualItem parentId={buyList.id} refresh={refreshLists}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <ChooseRecipe buyListId={buyList.id} refresh={refreshLists}/>
                </div>
            </div>

            <div className="row">
                <div className="col">   
                    <Items items={items} refresh={refreshLists} />
                </div>
            </div>

            <div className="row">
                <div className="col">   
                    <Products parentId={buyList.id} 
                              parentType="BUYLIST" 
                              items={products} 
                               refresh={refreshLists}/>
                               {/* categories={categories} */}
                </div>
            </div>
            
        </div>
    );
};

export default BuyListCreator;
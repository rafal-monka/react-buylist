import React, { useState, useEffect } from "react";
import Items from "./Items";
import ProductItems from "./ProductItems";
import AddManualItem from "./AddManualItem";
import ChooseRecipe from "./ChooseRecipe";
import UpdatePrices from "./UpdatePrices";
import ListDataService from "../services/ListDataService";
import ItemDataService from "../services/ItemDataService";
import ProductDataService from "../services/ProductDataService";
import ExtraDataService from "../services/ExtraDataService";

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
        })
        .catch(e => {
            console.log(e);
        });
    }

    //retrieve items of buy list
    const clearBuyList = () => {   
        if (window.confirm("Do you want to delete all items from list?")) {     
            ItemDataService.deleteAllItemsFromList(buyListId) 
            .then(response => {
                retrieveItems(buyListId);
            })
            .catch(e => {
                console.log(e);
            });
        }
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

    const copyItemsBetweenLists = () => {
        alert("TODO: copyItemsBetweenLists");
        return;

        ExtraDataService.copyItemsBetweenLists()
        .then(response => {
            props.refresh();
        })
        .catch(e => {
            console.log(e);
        });
    }
    
      //refresh both lists
    const refreshLists = () => {
        retrieveItems(buyListId);
        retrieveProducts(buyListId);
    }
    return (
        <div>

{/* <button onClick={()=>refreshLists()}>Refresh</button> */}

            <h3>#{buyList.id} {buyList.name} {buyList.description}</h3>
            <div className="row">
                <div className="col">   
                    <button className="m-3 btn btn-sm btn-primary" onClick={()=>{props.history.push(process.env.PUBLIC_URL+"/buylists/"+buyListId)} }>
                        Edit list
                    </button> 

                    <button className="m-3 btn btn-sm btn-success" onClick={()=>{props.history.push(process.env.PUBLIC_URL+"/buylists/execute/"+buyListId)} }>
                        &gt; Execute list
                    </button> 
                    
                    {items.length > 0 ?
                        <span> 
                            <UpdatePrices listId={buyList.id} refresh={()=>retrieveItems(buyListId)}/>
                            <button className="m-3 btn btn-sm btn-danger" onClick={clearBuyList}>Clear list</button>
                        </span>
                    : ""}
                </div>
            </div>

            <div className="row">
                <div className="col">   
                    <Items items={items} refresh={refreshLists} />
                </div>
            </div>


            <h4><i>Add items</i></h4>

            <div className="row">
                <div className="col">
                    <ChooseRecipe buyListId={buyList.id} refresh={refreshLists}/>
                </div>
            </div>

            <h4>Choose from catalog</h4>
            <div className="row">
                <div className="col">   
                    <ProductItems parentId={buyList.id} 
                              parentType="BUYLIST" 
                              items={products} 
                               refresh={refreshLists}/>
                               {/* categories={categories} */}
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <AddManualItem parentId={buyList.id} refresh={refreshLists}/>
                </div>
            </div>

            <h4>Copy active items from another list</h4>
            <div className="row">
                <div className="col">
                    <button className="m-3 btn btn-sm btn-primary" onClick={copyItemsBetweenLists}>Choose list</button>
                </div>
            </div>

        </div>
    );
};

export default BuyListCreator;
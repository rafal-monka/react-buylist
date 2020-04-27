import React, { useState, useEffect } from "react";
import Items from "./Items";
import Products from "./Products";
import AddManualItem from "./AddManualItem";
import ListDataService from "../services/ListDataService";
import ItemDataService from "../services/ItemDataService";
import ProductDataService from "../services/ProductDataService";

const RecipeCreator = props => {
    var recipeId = props.match.params.id;

    const receipeObj = {
        id: recipeId,
        name: "",
        description: "",
        active: false
    }

    const [recipe, setRecipe] = useState(receipeObj); 
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]); 
    //const [categories, setCategories] = useState([]);
       
    useEffect(() => {
        retrieveRecipe(recipeId);
        retrieveItems(recipeId);
        retrieveProducts(recipeId);
    }, [recipeId]);

    //retrieve buy list info
    const retrieveRecipe = id => {
        ListDataService.get(id) 
        .then(response => {
            setRecipe(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    //retrieve items of buy list
    const retrieveItems = recipeid => {        
        ItemDataService.getItems(recipeid) 
        .then(response => {
            setItems(response.data);
            //console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    //retrieve product catalog
    const retrieveProducts = recipeid => {
        ProductDataService.getProductsNotOnList(recipeid)
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
        retrieveItems(recipeId);
        retrieveProducts(recipeId);
    }

    return (
        <div>
            {/* <Link to={`/buylistitems/choose/${buyList.id}`} className="nav-link">
                Add item
            </Link> */}
{/* <button onClick={()=>refreshLists()}>Refresh</button> */}

            <h2>Recipe #{recipe.id} {recipe.name}</h2>
            
            <div className="row">
                <div className="col"> 
                    <AddManualItem parentId={recipe.id} refresh={refreshLists}/>
                </div>
            </div>

            <div className="row">
                <div className="col">   
                    <Items items={items} refresh={refreshLists}/>
                </div>
            </div>

            <div className="row">
                <div className="col">   
                    <Products 
                        parentType="RECIPE" 
                        parentId={recipe.id} 
                        items={products}                          
                        refresh={refreshLists}/>
                        {/* categories={categories} */}
                </div>
            </div>
            
        </div>
    );
};

export default RecipeCreator;
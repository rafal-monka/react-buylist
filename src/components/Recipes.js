import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ListDataService from "../services/ListDataService";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        retrieveRecipes();
    }, []);

    const retrieveRecipes = () => {
        ListDataService.getAll("RECIPE")
          .then(response => {
            setRecipes(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    const addRecipe = () => {
      history.push("/recipes/add");  
    }

    const gotoRecipe = (id) => {
      history.push("/creator/recipe/"+id); 
    }

    return (
        <div className="row">
          <div className="col-md-10">
            <h4>Recipes</h4>

            <button className="m-3 btn btn-sm btn-success" onClick={addRecipe}>
                Add recipe
            </button>

            <ul className="list-group">
              {recipes.length > 0 ?
                recipes.map((recipe, index) => (
                <li className="list-group-item" 
                    key={index} 
                    onClick={() => gotoRecipe(recipe.id)}>
                    #{recipe.id} {recipe.name} - {recipe.description} - {recipe.createdAt}
                </li>
                )) : "Lista jest pusta"}
            </ul>
          </div>                 

      </div>
    );
};

export default Recipes;
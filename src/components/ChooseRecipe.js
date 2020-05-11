import React, { useState, useEffect } from "react";
import ListDataService from "../services/ListDataService";
import ExtraDataService from "../services/ExtraDataService";

const ChooseRecipe = props => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(-1);

    useEffect(() => {
        retrieveRecipes();
    }, []);

    const retrieveRecipes = () => {
        ListDataService.getAll("RECIPE")
          .then(response => {
            setRecipes(response.data);
            setSelectedRecipeId(response.data[0].id)
          })
          .catch(e => {
            console.log(e);
          });
    };

    const handleSelectChange = (e) => setSelectedRecipeId(
        1*e.currentTarget.value
    )

    const addRecipe = () => {
        var data = {
            sourceid: selectedRecipeId,
            destid: props.buyListId
        }
        ExtraDataService.copyItemsFromRecipeToBuyList(data)
            .then(response => {
                props.refresh();
            })
            .catch(e => {
                console.log(e);
            });    
    }

    return (
        <div>
            <h4>Select recipe</h4>
            <div className="row">
                <div className="col">
                    <select onChange={handleSelectChange} value={selectedRecipeId} className="form-control">
                    { recipes.map((recipe, index) => (
                        <option value={recipe.id} key={recipe.id} > 
                            #{recipe.id} {recipe.name} - {recipe.description} - {recipe.createdAt}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col">
                    <button className="m-3 btn btn-success" onClick={addRecipe}>
                        Add recipe
                    </button>
                </div>
            </div>
      </div>
    );
};

export default ChooseRecipe;
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ListDataService from "../services/ListDataService";

const RecipeAdd = () => {
  const history = useHistory();

  const [recipe, setRecipe] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const saveRecipe = () => {
    var data = {
      name: recipe.name,
      type: "RECIPE",
      description: recipe.description
    };

    ListDataService.create(data)
      .then(response => {
        setRecipe({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          description: response.data.description,
          active: response.data.active
        });
        history.push(process.env.PUBLIC_URL+"/recipes/creator/"+response.data.id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
        <h4>Add new recipe</h4>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={recipe.name}
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
              value={recipe.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveRecipe} className="btn btn-success">
            Save
          </button>
        </div>
      
    </div>
  );
};

export default RecipeAdd;
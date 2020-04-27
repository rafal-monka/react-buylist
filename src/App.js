import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import Home from "./components/Home";
import BuyListAdd from "./components/BuyListAdd";
import BuyList from "./components/BuyList";
import BuyLists from "./components/BuyLists";
import BuyListCreator from "./components/BuyListCreator";
import Recipes from "./components/Recipes.js";
import RecipeAdd from "./components/RecipeAdd.js";
import RecipeCreator from "./components/RecipeCreator";
import Product from "./components/Product";
import BuyListExecute from "./components/BuyListExecute";

//import TableTest from "./components/Table";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            <span className="glyphicon glyphicon-home">[H]</span>
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/buylists"} className="nav-link">
                Buy lists
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/recipes"} className="nav-link">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={"/buylists"} component={BuyLists} />
            <Route exact path="/buylists/add" component={BuyListAdd} />
            <Route exact path="/buylists/:id" component={BuyList} />
            <Route exact path="/buylists/execute/:id" component={BuyListExecute} />  
            <Route exact path="/creator/buylist/:id" component={BuyListCreator} />  
            <Route exact path="/recipes" component={Recipes} />  
            <Route exact path="/recipes/add" component={RecipeAdd} /> 
            <Route exact path="/creator/recipe/:id" component={RecipeCreator} /> 
            <Route exact path="/products" component={Product} />    
            {/* <Route exact path="/table" component={TableTest} />    */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link/*, useRouteMatch */} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import Home from "./components/Home";
import BuyListAdd from "./components/BuyListAdd";
import BuyLists from "./components/BuyLists";
import BuyList from "./components/BuyList";
import BuyListCreator from "./components/BuyListCreator";
import Recipes from "./components/Recipes.js";
import RecipeAdd from "./components/RecipeAdd.js";
import RecipeCreator from "./components/RecipeCreator";
import Products from "./components/Products";
import Product from "./components/Product";
import BuyListExecute from "./components/BuyListExecute";

//import TableTest from "./components/Table";

function App() {
  //let match = useRouteMatch();
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={`${process.env.PUBLIC_URL}/home`} className="navbar-brand">
            <span className="glyphicon glyphicon-home">Home</span>
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/buylists`} className="nav-link">
                Shop lists
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/recipes`} className="nav-link">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`${process.env.PUBLIC_URL}/products`} className="nav-link">
                Products
              </Link>
            </li>
          </div>
        </nav>
        
        <div className="container mt-3">

            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/buylists`} component={BuyLists} />
              <Route exact path={`${process.env.PUBLIC_URL}/buylists/add`} component={BuyListAdd} />
              <Route exact path={`${process.env.PUBLIC_URL}/buylists/execute/:id`} component={BuyListExecute} />  
              <Route exact path={`${process.env.PUBLIC_URL}/buylists/creator/:id`} component={BuyListCreator} />  
              <Route path={`${process.env.PUBLIC_URL}/buylists/:id`} component={BuyList} />
              <Route exact path={`${process.env.PUBLIC_URL}/recipes`} component={Recipes} />  
              <Route exact path={`${process.env.PUBLIC_URL}/recipes/add`} component={RecipeAdd} /> 
              <Route path={`${process.env.PUBLIC_URL}/recipes/creator/:id`} component={RecipeCreator} /> 
              <Route exact path={`${process.env.PUBLIC_URL}/products`} component={Products} />    
              <Route path={`${process.env.PUBLIC_URL}/products/:id`} component={Product} />
              <Route exact path={["/", `${process.env.PUBLIC_URL}/home`]} component={Home} />
              {/* <Route exact path="/table" component={TableTest} />    */}
            </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;

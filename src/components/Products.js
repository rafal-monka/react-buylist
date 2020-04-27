import React, { useState, useEffect } from "react";
import ItemsDataService from "../services/ItemDataService";
import ProductDataService from "../services/ProductDataService";
  
const Products = props => {
//console.log("Catalog.props.parentId="+props.parentId);
  const shops = [...new Set( props.items.map(obj => obj.shop)) ];
  const categories = [...new Set( props.items.map(obj => obj.category)) ];

  const addProductToList = (product) => {
    console.log(new Date()+"addProduct");
    var obj = {
      parentid: props.parentId, 
      name: product.name,
      category: product.category,
      shop: product.shop,
      source: props.parentType,
      unit: product.unit ? product.unit : "SZT",
      price: product.price ? product.price : 0.0
    }

    ItemsDataService.create(obj)
      .then(response => {
        props.refresh();
    })
    .catch(e => {
        console.log(e);
    });
  }

  const deleteProduct = (id) => {
    ProductDataService.remove(id)
      .then(response => {
        props.refresh();
    })
    .catch(e => {
        console.log(e);
    });  
  }

  const filterCategory = (v) => {
    alert(v);
    //@@@props.catalog = filter
  }

  return (
    <div>
      <br/>shops={JSON.stringify(shops)}
      <br/>categories={JSON.stringify(categories)}
      <div className="row">
          <div className="col">
            <span className="badge badge-info" onClick={()=>filterCategory("*")}>*</span>
          </div>
          {categories.map((cat, index) => (
            <div className="col" key={index}>
              <span className="badge badge-info" onClick={()=>filterCategory(cat)}>{cat}</span>
            </div>  
          ))
          }
        
      </div>

      <table className="table table-striped table-bordered table-hover table-sm">
        <thead>
            <tr>
                <th>No</th>
                <th></th>
                <th>Category</th>
                <th>Name</th>
                <th>Shop</th>
                <th>Unit</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
          {props.items.map((product, index) => (
            <tr key={index}>
              <td>{index+1}</td>
          <td>{props.parentId !== null ? 
              <button className="badge badge-success" onClick={() => addProductToList(product)}>+</button>
              :
              <button className="badge badge-danger" onClick={() => deleteProduct(product.id)}>-</button>              
              }</td>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>{product.shop}</td>
              <td>{product.unit}</td>
              <td>{product.price}</td>
            </tr> 
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Products;
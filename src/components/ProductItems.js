import React, { useState, useEffect } from "react";
import { useHistory  } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ItemsDataService from "../services/ItemDataService";
import ProductDataService from "../services/ProductDataService";

const ProductItems = props => {
  const history = useHistory();
  const [filterText, setFilterText] = useState("");
  let arr = [...new Set( props.items.map(obj => obj.category)) ].map((str) => ( { name: str }));
  const [categories, setCategories] = useState(arr);

  useEffect(() => {
    filterCategories(filterText);
  }, [props]);



  //setCategories();
  //const shops = [...new Set( props.items.map(obj => obj.shop)) ];
  //const categories = [...new Set( props.items.map(obj => obj.category)) ].map((str) => ( { name: str }));

  const addProductToList = (product) => {
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
        filterCategories(filterText);
    })
    .catch(e => {
        console.log(e);
    });
  }

  const filterCategories = (text = "") => {
    if (props.items.length === 0) return; 
    let tmp = props.items.filter((item) => 
      (text === "" || item.name.toUpperCase().indexOf(text.toUpperCase())>-1)
    );
    let arr = [...new Set( tmp.map(obj => obj.category)) ].map((str) => ( { name: str }));
    setCategories(arr);
  }

  const handleFilterTextChange = (e) => {
    setFilterText(e.currentTarget.value);
    filterCategories(e.currentTarget.value);
  }

  //edit
  const editProduct = (product) => {
      history.push(process.env.PUBLIC_URL+"/products/"+product.id);
  }

//edit
const deleteProduct = (product) => {
  if (window.confirm('Are you sure to DELETE a product?')) 
  ProductDataService.remove(product.id)
        .then(response => {
          props.refresh();
          filterCategories(filterText);
      })
      .catch(e => {
          console.log(e);
      });
}  
  

  return (
    <div>
      {/* <br/>shops={JSON.stringify(shops)}
      <br/>categories={JSON.stringify(categories)} */}
      {/* <div className="row">
          <div className="col">
            <span className="badge badge-info" onClick={()=>filterCategory("*")}>*</span>
          </div>
          {categories.map((cat, index) => (
            <div className="col" key={index}>
              <span className="badge badge-info" onClick={()=>filterCategory(cat)}>{cat}</span>
            </div>  
          ))
          }
        
      </div> */}

          <input
              type="text"
              className="form-control"              
              id="filterText"
              placeholder="Filter catalog..."
              value={filterText}
              onChange={handleFilterTextChange}
              name="filterText"
            />
      <Accordion>
      {/* defaultActiveKey={0} */}
        {categories.map((category, index) => (
          <Card key={index}>

            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                {category.name}
              </Accordion.Toggle>
            </Card.Header>

            <Accordion.Collapse eventKey={index}>
              <Card.Body>
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
                    {props.items.filter((item) => item.category === category.name && (filterText === "" || item.name.toUpperCase().indexOf(filterText.toUpperCase())>-1)).map((product, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                    <td>{props.parentId !== null ? 
                        <button className="badge badge-success" onClick={() => addProductToList(product)}>Add</button>
                        :
                        <span>
                          <button className="badge badge-primary" onClick={() => editProduct(product)}>Edit</button>    
                          <button className="badge badge-danger" onClick={() => deleteProduct(product)}>Del</button>           
                        </span>
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
              </Card.Body>
            </Accordion.Collapse>

          </Card>
        ))}
      </Accordion>
      <br/>
    </div>
  );
};

export default ProductItems;
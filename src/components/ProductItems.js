import React from "react";
import { useHistory  } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ItemsDataService from "../services/ItemDataService";
  
const ProductItems = props => {
  const history = useHistory();
  //const shops = [...new Set( props.items.map(obj => obj.shop)) ];
  const categories = [...new Set( props.items.map(obj => obj.category)) ].map((str, index) => ({ name: str, state: true }));

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
    })
    .catch(e => {
        console.log(e);
    });
  }

  //edit
  const editProduct = (product) => {
      history.push("/products/"+product.id);
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

      <Accordion defaultActiveKey={0}>

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
                    {props.items.filter((item) => item.category === category.name).map((product, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                    <td>{props.parentId !== null ? 
                        <button className="badge badge-success" onClick={() => addProductToList(product)}>Add</button>
                        :
                        <button className="badge badge-primary" onClick={() => editProduct(product)}>Edit</button>              
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
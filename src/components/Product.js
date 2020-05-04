import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductDataService";

const Product = props => {
  const initialProductState = {
    id: null,
    name: "",
    category: "",
    shop: "",
    unit: "",
    price: 0.0
  };
  //const [products, setProducts] = useState([]); 
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [prevProduct, setPrevProduct] = useState(-1);
  const [nextProduct, setNextProduct] = useState(-1);
  const [message, setMessage] = useState("");
  
  const getProduct = id => {
    //   console.log('id='+id);
    // ProductDataService.get(id)
    //   .then(response => {
    //     setCurrentProduct(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

      ProductDataService.getProductsNotOnList(null)
        .then(response => {
            //setProducts(response.data);
            
            let currentIndex = response.data.findIndex(item => +item.id === +id)
            setCurrentProduct(response.data[currentIndex]);
            if (currentIndex > 0) {
                setPrevProduct(response.data[currentIndex-1].id);
            } else {
                setPrevProduct(null);
            } 
            if (currentIndex < response.data.length-1) {
                  setNextProduct(response.data[currentIndex+1].id);
            } else {
                setNextProduct(null);
            }       
            return response.data[currentIndex];                  
        })
        .catch(e => {
            console.log(e);
        });
  };

  useEffect(() => {
    setMessage("");
    setCurrentProduct(getProduct(props.match.params.id));
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct.id, currentProduct)
      .then(response => {
        setMessage("The Product was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const GotoProduct = (id) => {
    props.history.push("/products/"+id);    
  }

  const deleteProduct = () => {
    if (window.confirm("Do you want to remove product?")) {
        ProductDataService.remove(currentProduct.id)
        .then(response => {
            props.history.push("/products");
        })
        .catch(e => {
            console.log(e);
        });
    }
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="shop">Shop</label>
              <input
                type="text"
                className="form-control"
                id="shop"
                name="shop"
                value={currentProduct.shop}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit">Unit</label>
              <input
                type="text"
                className="form-control"
                id="unit"
                name="unit"
                value={currentProduct.unit}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>

          </form>

          {prevProduct ? 
          <button
            type="submit"
             className="btn btn-info"
             onClick={() => GotoProduct(prevProduct)}>
              &lt;
          </button>
          : ""}

          {nextProduct ? 
            <button
              type="submit"
              className="btn btn-info"
              onClick={() => GotoProduct(nextProduct)}>
              &gt;
            </button>
           : ""}

          <button className="btn btn-danger mr-2" onClick={deleteProduct}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateProduct}
          >
            Update
          </button>

          <p>{message}</p>
        </div>
      ) : ""}
    </div>
  );
};

export default Product;
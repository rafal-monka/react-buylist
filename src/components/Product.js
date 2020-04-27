import React, {useState, useEffect} from "react";
import Products from "./Products";
import ProductAdd from "./ProductAdd";
import ProductDataService from "../services/ProductDataService";

const Product = () => {
    const [products, setProducts] = useState([]); 
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveProduct();
    }, []);

    //retrieve product catalog
    const retrieveProduct = () => {
        ProductDataService.getProductsNotOnList(null)
            .then(response => {
                setProducts(response.data);
                const tmp = [...new Set( response.data.map(obj => obj.category)) ];
                setCategories(tmp);
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    return (
        <div>
            <h1>Products</h1>

            <div className="row">
                <div className="col">
                    <ProductAdd refresh={retrieveProduct}/>
                </div>
            </div>

            <Products 
                parentType="" 
                parentId={null} 
                items={products} 
                categories={categories}
                refresh={retrieveProduct}
            />
        </div>        

    )
}

export default Product;
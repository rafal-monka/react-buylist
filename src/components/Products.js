import React, {useState, useEffect} from "react";
import ProductItems from "./ProductItems";
import ProductAdd from "./ProductAdd";
import ProductDataService from "../services/ProductDataService";

const Products = () => {
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

            <ProductItems
                parentType="" 
                parentId={null} 
                items={products} 
                categories={categories}
                refresh={retrieveProduct}
            />
        </div>        

    )
}

export default Products;
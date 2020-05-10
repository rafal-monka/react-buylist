import React, {useState, useEffect} from "react";
import ItemTableRow from "./ItemTableRow";
//SORTTABLE - https://github.com/AllenFang/react-bootstrap-table

const Items = props => {
    let filteredItems = props.items;
    const total = Math.round(filteredItems.reduce((a,b) => +a + +b.value, 0) * 100) / 100;
//    let tmp = filteredItems.map((item, index)=>{return item.amount});  
//console.log(tmp);  
//    const [amounts, setAmounts] = useState(tmp);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // console.log(props.items);
        setItems(filteredItems);
        // console.log(items);
    }, [filteredItems]);

    //delete item from list
    // const deleteItem = item => {
    //     ItemDataService.deleteItem(item.id) 
    //     .then(response => {
    //         props.refresh();
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    // }

    // const handleInputChange = (event) => {
    //     //let index = 0;
    //     const { name, value } = event.target;
    //     let field = name.substr(0,name.indexOf("-"));
    //     let index = name.substr(name.indexOf("-")+1);
    //     console.log("handleInputChange"+name+"/"+index+"/"+value);
    //     items[index].amount = value;
    //     console.log(tmp);
    //     setAmounts(items);
    //     //props.refresh();
    // }

    return (
        <div>     
            {/* {JSON.stringify(filteredItems)} */}
            {items && items.length > 0 ? 
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th></th>
                            <th>Shop</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Source</th>
                            <th>Amount</th>
                            <th>Unit</th>
                            <th>Price</th>
                            <th>Value</th>
                            {/* <th>Date</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { items.map((item, index) => (
                        <ItemTableRow key={index} item={item} index={index} refresh={props.refresh}/>
                    )) }
                    <tr>
                        <td colSpan="9">Total</td>
                        <td style={{textAlign: "right"}}>{total}</td>
                        {/* <td></td> */}
                    </tr>
                    </tbody>
                </table>
            : "Lista jest pusta" }
        </div>
    );
};

export default Items;


        // ItemsDataService.updateBuyListItem(item.id, "updated "+new Date()) 
        // .then(response => {
        //     props.refresh();
        // })
        // .catch(e => {
        //     console.log(e);
        // });

        // <div className="row">
        // <div className="col-md-8">
        // </div>
        // </div>

        //<input type="number" value={item.price} name={"price-"+index} onChange={handleChange}></input>
        //<input type="number"
        
            //handle price change
    // const handleChange = (event) => {
    //     // const { name, value } = event.target;
    //     // setCurrentBuyList({ ...currentBuyList, [name]: value });
    //     const { name, value } = event.target;
    //     let field = name.substr(0,name.indexOf("-"));
    //     let index = name.substr(name.indexOf("-")+1);
    //     filteredItems[index][field] = value;
    //     filteredItems[index].value = filteredItems[index].price * filteredItems[index].amount;
    // } 
import React, {useState, useEffect} from "react";

import ItemDataService from "../services/ItemDataService";
//SORTTABLE - https://github.com/AllenFang/react-bootstrap-table

const Table = (props) => {
    const total = props.rows.reduce((a,b) => +a + +b.value, 0);

    //delete item from list
    const markItem = (item, newStatus) => {
        ItemDataService.updateItemStatus(item.id, newStatus) 
        .then(response => {
            props.refresh();
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <div>
        {props.rows.length > 0 ? 
            <table className="table table-striped table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th></th>
                        <th>Shop</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Source</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Unit</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                { props.rows.map((item, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.status === "ACTIVE" ?
                            <button className="badge badge-warning" onClick={() => markItem(item, "BOUGHT")}>*</button>
                            :
                            <button className="badge badge-info" onClick={() => markItem(item, "ACTIVE")}>^</button>}
                        </td>
                        <td>{item.shop}</td>
                        <td>{item.category}</td>
                        <td nowrap="true">{item.name}</td>
                        <td>{item.source}</td>
                        <td>{item.price}</td>
                        <td>{item.amount}</td>
                        <td>{item.unit}</td>
                        <td>{item.value}</td>
                        <td nowrap="true">{item.createdAt}</td>
                    </tr>
                )) }
                <tr>
                    <td colSpan="9">Total</td>
                    <td>{total}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        : "Lista jest pusta" }
    </div>
    )
}

const ItemsExecute = props => {
    let items = props.items.filter(item => item.status===props.status);
    const shops = [...new Set( items.map(obj => obj.shop)) ];
    const categories = [...new Set( items.map(obj => obj.category)) ];

    return (
        <div>
            status={props.status}    
            <br/>shops={JSON.stringify(shops)}
            <br/>categories={JSON.stringify(categories)} 
            <Table rows={items} refresh={props.refresh} />
        </div>
    );
};

export default ItemsExecute;


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
    //     // console.log(name);
    //     let field = name.substr(0,name.indexOf("-"));
    //     let index = name.substr(name.indexOf("-")+1);
    //     // console.log(field);
    //     // console.log(index);
    //     // console.log(value);
    //     filteredItems[index][field] = value;
    //     filteredItems[index].value = filteredItems[index].price * filteredItems[index].amount;
    //     console.log(filteredItems);
    // } 
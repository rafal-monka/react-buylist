import React from "react";

import ItemDataService from "../services/ItemDataService";
//SORTTABLE - https://github.com/AllenFang/react-bootstrap-table

const toInitCap = (str) => {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
} 

const Table = (props) => {
    const total = Math.round(props.rows.reduce((a,b) => +a + +b.value, 0)*10)/10;   

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
        <div className="row">
        {props.rows.length > 0 ? 
            <div className="col">
                <h4>{props.status}</h4>
                shops={JSON.stringify(props.shops)}
                <br/>categories={JSON.stringify(props.categories)}                 
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Cat./Shop</th>
                            <th>Amount</th>
                            <th>Unit</th>
                            <th>Price</th>
                            <th>Value</th>
                            <th>Source</th>
                            {/* <th>Date</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { props.rows.map((item, index) => (
                        <tr key={index}>
                            <td nowrap="true">{item.status === "ACTIVE" ?
                                <button className="badge badge-warning" onClick={() => markItem(item, "LATER")}><span style={{fontSize:"11px"}}>?</span></button>
                                :
                                <button className="badge badge-info" onClick={() => markItem(item, "ACTIVE")}><span style={{fontSize:"11px"}}>^</span></button>}
                                &nbsp;{index+1}
                            </td>
                            {/* <td><span style={{fontSize: "9px"}}></span></td> */}
                            <td nowrap="true">
                                {item.status === "ACTIVE" ?
                                <button className="badge badge-success" onClick={() => markItem(item, "BOUGHT")}><big>{item.name}</big></button>
                                :
                                <span>{item.name}</span>}
                            </td>
                            <td nowrap="true"><span style={{fontSize: "8px"}}><b>{toInitCap(item.category)}</b> / {toInitCap(item.shop)}</span></td>                            
                            <td style={{textAlign: "right"}}>{item.amount}</td>
                            <td>{item.unit.toLowerCase()}</td>
                            <td style={{textAlign: "right"}}>{item.price}</td>
                            <td style={{textAlign: "right"}}><b>{item.value}</b></td>
                            <td nowrap="true"><i>{item.source}</i></td>
                            {/* <td nowrap="true">{item.createdAt}</td> */}
                        </tr>
                    )) }
                    <tr>
                        <td colSpan="6">Total</td>
                        <td style={{textAlign: "right"}}><b>{total}</b></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        : "Lista jest pusta" }
    </div>
    )
}

const ItemsExecute = props => {
    let items = props.items.filter(item => item.status===props.status);
    const shops = [...new Set( items.map(obj => toInitCap(obj.shop))) ];
    const categories = [...new Set( items.map(obj => toInitCap(obj.category))) ];

    return (
        <div>
            {/* status={props.status}    <br/> */}    
            <Table rows={items} refresh={props.refresh} status={props.status} shops={shops} categories={categories}/>
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
    //     let field = name.substr(0,name.indexOf("-"));
    //     let index = name.substr(name.indexOf("-")+1);
    //     filteredItems[index][field] = value;
    //     filteredItems[index].value = filteredItems[index].price * filteredItems[index].amount;
    // } 
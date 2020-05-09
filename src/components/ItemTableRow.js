import React, {useState, useEffect} from "react";
import ItemDataService from "../services/ItemDataService";
//SORTTABLE - https://github.com/AllenFang/react-bootstrap-table

const ItemTableRow = props => {
    let item_z_props = props.item;

    const [item, setItem] = useState(props.item);
    let index = props.index;

    useEffect(()=> {
        setItem(props.item);
    }, [props.item])

    const deleteItem = item => {
        ItemDataService.deleteItem(item.id) 
            .then(response => {
                props.refresh();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const changeValue = (item, value) => {
        if (1*value === -1.0 && 1*item.amount === 0.0) return;
        ItemDataService.updateItemAmount(item, (1*item.amount) + (1*value*(item.unit==="KG" ? 0.1 : 1))) 
            .then(response => {
                props.refresh();
            })
            .catch(e => {
                console.log(e);
            });
    }


    return (
        (item) ?         
            <tr key={index}>
            <td>{index+1}</td>
            <td>
                <button className="badge badge-danger" onClick={() => deleteItem(item)}>-</button>
            </td>
            <td>{item.shop}</td>
            <td>{item.category}</td>
            <td nowrap="true">{item.name}</td>
            <td>{item.source}</td>
            <td style={{textAlign: "right"}}>{item.price}</td>
            <td style={{textAlign: "right"}}>
            <span>{item.amount}</span>&nbsp;&nbsp;<button className="badge badge-primary" onClick={()=>changeValue(item, -1)}>-</button>&nbsp;<button className="badge badge-primary" onClick={()=>changeValue(item, 1)}>+</button>
            </td>
            <td>{item.unit}</td>
            <td style={{textAlign: "right"}}>{item.value}</td>
            <td nowrap="true">{item.createdAt} / {item.updatedAt}</td>
            </tr>
        : ""
    );
}

export default ItemTableRow;
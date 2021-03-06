import React, {useState, useEffect} from "react";
import ItemDataService from "../services/ItemDataService";
import { reduceHooks } from "react-table";
//SORTTABLE - https://github.com/AllenFang/react-bootstrap-table

const ItemTableRow = props => {
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
        ItemDataService.updateItemAmount(item, (1*item.amount) + (1*value*(item.unit.toLowerCase()==="kg" ? 0.1 : 1))) 
            .then(response => {
                props.refresh();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const editItemProperty = (item, propertyName) => {
        let newValue = prompt('Enter new value for ['+propertyName+']', item[propertyName])

        if (newValue===''||newValue===null) return

        item[propertyName] = newValue

        //calculate value
        if ( ['price'].indexOf(propertyName.toLowerCase())>-1 ) item.value = item.amount * item.price

        ItemDataService.updateItem(item.id, item) 
            .then(response => {
                props.refresh();
            })
            .catch(e => {
                console.log(e);
            });

    }

    const showPromotions = (item) => {
        let doc = document.getElementById(item.id)
        doc.innerHTML = '...' 
        ItemDataService.getPromotions(item.name) 
        .then(response => {
            //render promotions
            let html = 'brak'
            if (response.data.length > 0) {
                html = '<br>'
                response.data.forEach(item => {
                    html += '<a target="_blank" href="'+item.url+'">'+item.product+'</a>'
                    html += '<ul>'
                    item.magazines.forEach(magazine => {
                        html += '<li><a target="_blank" href="'+magazine.url+'">'+magazine.title+'</a></li>'
                    })
                    html += '</ul>'
                })
            }
            doc.innerHTML = html
        })
        .catch(e => {
            console.log(e);
        });
    }       
    
    const hidePromotions = (item) => {
        let doc = document.getElementById(item.id)
        doc.innerHTML = ''
    } 

    return (
        (item) ?         
            <tr key={index} style={{color: item.amount > 0.0 ? "black": "red"}}>
            <td>{index+1}</td>
            <td>
                <button className="badge badge-danger" onClick={() => deleteItem(item)}>-</button>
            </td>
            <td><span onClick={() => editItemProperty(item, 'shop')}>{item.shop}</span></td>
            <td>{item.category.toLowerCase()}</td>
            <td nowrap="true"><span onClick={() => editItemProperty(item, 'name')}>{item.name}</span></td>
            <td nowrap="true" style={{textAlign: "right"}}>
            <span>{item.amount}</span>&nbsp;&nbsp;<button className="badge badge-primary" onClick={()=>changeValue(item, -1)}>-</button>&nbsp;<button className="badge badge-primary" onClick={()=>changeValue(item, 1)}>+</button>
            </td>
            <td><span onClick={() => editItemProperty(item, 'unit')}>{item.unit.toLowerCase()}</span></td>
            <td style={{textAlign: "right"}}><span onClick={() => editItemProperty(item, 'price')}>{item.price}</span></td>
            <td style={{textAlign: "right"}}><b>{item.value}</b></td>
            <td nowrap="false"><span style={{fontFamily: "courier"}}>{item.status}</span></td>
            <td nowrap="false"><i>{item.source}</i></td>
            <td nowrap="false">
                <button className="badge badge-info" onClick={()=>showPromotions(item)}>?</button>
                &nbsp;<button className="badge" onClick={()=>hidePromotions(item)}>-</button>
                <span id={item.id}></span>
            </td>
            {/* <td nowrap="true">{item.createdAt} / {item.updatedAt}</td> */}
            </tr>
        : ""
    );
}

export default ItemTableRow;
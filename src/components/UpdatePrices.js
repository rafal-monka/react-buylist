import React from "react";
import ExtraDataService from "../services/ExtraDataService";

const UpdatePrices = props => {

    const update = () => {
        if (window.confirm("Do you want to update prices?")) {
            var data = {
                listid: props.listId
            }
            ExtraDataService.updatePrices(data)
                .then(response => {
                    props.refresh();
                })
                .catch(e => {
                    console.log(e);
                });    
        }
    }

    return (
        <button className="m-3 btn btn-sm btn-warning" onClick={update}>
            Update prices
        </button>
    )
}

export default UpdatePrices;
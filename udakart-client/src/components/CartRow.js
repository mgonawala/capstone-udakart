import React, {useState} from "react";
import {useFormFields} from "../lib/formHooks";
import {useAppContext} from "../lib/contextLib";

export default function CartRow({item,index, updateCartState,deleteCartItem}){

    const [selectedOption, setOption] = useState(item.quantity);

    function dropdown (item)  {

      return (
          <select className="custom-select" id="inputGroupSelect01"
                  defaultValue={selectedOption}
                  onChange={ (e) => setQuantity(e,item.id)}
                  key={item.id}>
              {getOptions()}
          </select>
      );
    }

    function getOptions() {
        let options = [];
        for(let i=0 ;i< 10; i++){
            options.push(<option value={i+1} key={i+1}> {i + 1} </option>);
        }
        return (
            options
        );
    }
    function setQuantity(event, id) {
        setOption(event.target.value);
    }

    return(
        <tr key={item.id} className={"h-25"}>
            <th scope="row">{item.id}</th>
            <td className="w-25">
                <img src={item.imageUrl} style={{width: 100}}
                     className="img-fluid img-thumbnail" alt="Product"/>
            </td>
            <td>{item.name}</td>
            <td>
                <div className="input-group mb-3">
                    {dropdown(item)}
                </div>
            </td>
            <td>{selectedOption * item.unitPrice}</td>
            <td onClick={ (event) => updateCartState(item.id, selectedOption)}>
                <a href="#" className="btn btn-info btn-lg">
                   <i className="fas fa-edit"></i>
                </a>
            </td>
            <td onClick={ (event) => deleteCartItem(item.id)}><a href="#" className="btn btn-danger btn-lg">
                <i className="fas fa-trash"></i>
            </a></td>
        </tr>
    );
}

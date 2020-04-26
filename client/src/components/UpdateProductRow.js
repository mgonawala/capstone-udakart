import React, {useState} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {useFormFields} from "../lib/formHooks";
import {useAppContext} from "../lib/contextLib";
import {deleteProductItem, updateProductItem} from '../lib/ProductsLib'

export default function UpdateProductRow({item,index, updateProduct,deleteProduct}){

    const {authToken} = useAppContext()
    const [uploadedFile, setFile] = useState(null);
    const [fields, setFields] = useFormFields({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice
    })



    return(

        <tr key={item.id} className={"h-25"}>
            <th scope="row">{item.id}</th>
            <td className="w-25">
                <img src={`${item.imageUrl}`} style={{width: 100}}
                     className="img-fluid img-thumbnail" alt="Product" id={'imageId'}/>
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
            </td>
            <td>
                <FormGroup controlId="name" bsSize="large">
                    <FormControl type={"text"} value={fields.name} onChange={setFields} autoFocus />
                </FormGroup>
            </td>
            <td>
                <div className="input-group mb-3">
                    <FormGroup controlId="quantity" bsSize="large">
                        <FormControl type={"number"} value={fields.quantity} onChange={setFields} autoFocus />
                    </FormGroup>
                </div>
            </td>
            <td>
                <FormGroup controlId="unitPrice" bsSize="large">
                    <FormControl type={"number"} value={fields.unitPrice} onChange={setFields} autoFocus />
                </FormGroup>
            </td>
            <td onClick={ (event) => updateProduct(item.id,fields.name,fields.quantity, fields.unitPrice,uploadedFile,authToken)}>
                <a href="#" className="btn btn-info btn-lg">
                    <i className="fas fa-edit"></i>
                </a>
            </td>
            <td onClick={ (event) => deleteProduct(item.id,authToken)}><a href="#" className="btn btn-danger btn-lg">
                <i className="fas fa-trash"></i>
            </a></td>
        </tr>

    );
}

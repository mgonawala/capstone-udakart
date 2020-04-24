import React, {useState} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import {useHistory} from 'react-router-dom';
import {useFormFields} from "../lib/formHooks";
import {useAppContext} from "../lib/contextLib";
import {addProduct, getImageUploadUrl, uploadImage} from "../lib/ProductsLib";

export default function AddProduct() {

    const {authToken, setAuthToken} = useAppContext();
    const {isAuthenticated, userHasAuthenticated} = useAppContext();
    const history = useHistory();
    const [uploadedFile, setFile] = useState(null);
    const [fields, setFields] = useFormFields({
        productName: '',
        category:'',
        quantity: '',
        unitPrice: '',
        imageUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    async function handleSubmit(event){
        event.preventDefault();
        console.log('product added')
        setIsLoading(true);
        const result = await addProduct(fields.productName,fields.quantity, fields.unitPrice, fields.category, authToken);

        if(result.status == 201){
            //get Image upload URL
            const uploadUrl = await getImageUploadUrl(result.item.id, authToken);
            if( uploadUrl !== undefined){
                uploadImage(uploadUrl, uploadedFile);
            }
            alert(result.message);
            history.push('/');
        }
        else{
            alert(result.message);
            setIsLoading(false);
        }

    }

    function validateForm() {
        return (
            fields.productName.length > 0 &&
            fields.category.length > 0 &&
                fields.quantity > 0 &&
                fields.unitPrice > 0 &&
                uploadedFile != null
        );
    }


    return(

            <div className={"Signup"}>
                <form onSubmit={handleSubmit}>

                    <FormGroup controlId="productName" bsSize="large">
                        <ControlLabel>Product Name :</ControlLabel>
                        <FormControl type={"text"} value={fields.productName} onChange={setFields} autoFocus />
                    </FormGroup>

                    <FormGroup controlId="category" bsSize="large">
                        <ControlLabel>Product Category :</ControlLabel>
                        <FormControl type={"text"} value={fields.category} onChange={setFields} autoFocus />
                    </FormGroup>

                    <FormGroup controlId="quantity" bsSize="large">
                        <ControlLabel>Quantity :</ControlLabel>
                        <FormControl type={"number"} value={fields.quantity} onChange={setFields} autoFocus />
                    </FormGroup>

                    <FormGroup controlId="unitPrice" bsSize="large">
                        <ControlLabel>Unit Price :</ControlLabel>
                        <FormControl type={"number"} value={fields.unitPrice} onChange={setFields} autoFocus />
                    </FormGroup>

                    <FormGroup controlId="imageUrl" bsSize={"large"}>
                        <ControlLabel>Image :</ControlLabel>
                        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                    </FormGroup>
                    <LoaderButton
                        block
                        type={"submit"}
                        bsSize={"large"}
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Add Product !
                    </LoaderButton>
                </form>
            </div>
    );
}


import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAppContext} from "../lib/contextLib";
import "./ShoppingCart.css"
import {useFormFields} from "../lib/formHooks";
import CartRow from "./CartRow";
import CartTotal from "./CartTotal";
import {
    deleteProductItem,
    getAllProducts,
    getImageUploadUrl,
    getProductById,
    updateProductItem,
    uploadImage

} from "../lib/ProductsLib";
import UpdateProductRow from "./UpdateProductRow";

function getIndex(value, arr, prop) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}
export default function UpdateCart() {

    const history = useHistory();
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        onLoad();
    },[])

    async function updateProduct(id,name,quantity, unitPrice, uploadedFile, authToken){
        const result =  await updateProductItem(id,name,quantity,unitPrice,authToken);
        if(uploadedFile != null)
        {
            const uploadUrl = await getImageUploadUrl(id, authToken);
            if( uploadUrl !== undefined){
                await uploadImage(uploadUrl, uploadedFile);
                let src = document.getElementById('imageId').src;
                document.getElementById('imageId').src = '';
                document.getElementById('imageId').src = src;
            }
        }
        alert(result.message);
    }

    async function deleteProduct(id, authToken){
        const result =  await deleteProductItem(id,authToken);
        const newProducts = products.filter(item => item.id !== id);
        setProducts(newProducts);
        alert(result.message);
    }
    async function onLoad() {
        const products = await getAllProducts();
        setProducts(products);
    }

    function tableRows(){
        return(

            products.map( (item,index) => (
                <UpdateProductRow item={item} index={index} key={item.id} updateProduct={updateProduct} deleteProduct={deleteProduct}/>
            ))
        );
    }
    return(
        <div className={"container table-container"} >

            <div className={"row"}>
                <div className={"col-md"}>
                    <table className={"table table-bordered rounded"}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        { products && tableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

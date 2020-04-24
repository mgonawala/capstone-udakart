import Axios from 'axios';
import {ProductItem} from '../model/ModelItems';
const GET_API = 'http://localhost:8082/api/v0/products';

export async function deleteProductItem(id,authToken){
    try {
        const result = await Axios({
            method: 'delete',
            url: GET_API + '/' + id,
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            validateStatus: (status) => {
                return status < 600
            }
        });
        if(result.status == 204){
            return {
                message: 'Item Deleted successfully',
                item: result.data.items
            }
        }
        else{
            return {
                message: 'Can not Delete Item'
            }
        }
    }
    catch (e) {
        return{
            message: e.message
        }
    }
}

export async function updateProductItem(id,name,quantity, unitPrice, authToken){
    const item = {
        name: name,
        quantity: quantity,
        unitPrice: unitPrice
    };

    try {
        const result = await Axios({
            method: 'patch',
            url: GET_API + '/' + id,
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            data: item,
            validateStatus: (status) => {
                return status < 600
            }
        });
        if(result.status == 200){
            return {
                message: 'Item updated successfully',
                item: result.data.items
            }
        }
        else{
            return {
                message: 'Can not update Item'
            }
        }
    }
    catch (e) {
        return{
            message: e.message
        }
    }
}
export async function addProduct(name, quantity, unitPrice, category, authToken) {
    const item = {
        name: name,
        quantity: quantity,
        unitPrice: unitPrice,
        category: category
    };
    try{
        const result =  await Axios({
          method: 'post',
          url: GET_API,
          data: item,
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type':'application/json',
              'Accept':'application/json'
          }
      });
        if( result.status == 201){
            console.log('product created');
            return {
                status: result.status,
                item: result.data.item,
                message: 'Product added successfully'
            }
        }
        else{
            console.log('product not added');
            return {
                status: result.status,
                message: result.data.message
        }
        }
    }
    catch (error) {
        return {
            message: error

        }
    }
}

export async function uploadImage(uploadUrl, file){

        const result = await Axios({
            method: 'put',
            url: uploadUrl,
            data: file,
            headers: {
                'Content-Type':'image/png'
            }
        });
}

export async function getImageUploadUrl(productId,authToken){
    try{
        const result = await Axios({
            method: 'get',
            url: GET_API+'/signed-url/'+productId+'.jpg',
            headers: {
                'Authorization':`Bearer ${authToken}`,
                'Content-Type':'application/json'
            }
        });
        const url = result.data.url;
        return url;
    }
    catch(e){
        console.log(e);
        return undefined;
    }
}
export async function getAllProducts() {
    try{
        const result = await Axios({
            method: 'get',
            url:GET_API,
            headers: {
                'Accept':'application/json',
            }
        });
        console.log('Get Products:', result.data);
        let products = [];
        if(result.data.items.length > 0){

            products = result.data.items.map( item => {
                        let product = {};
                        product.id = item.id;
                        product.name = item.name;
                        // TODO change imageUrl property
                        product.imageUrl = item.imageUrl;
                        //product.imageUrl = 'https://i.picsum.photos/id/836/200/300.jpg';
                        product.unitPrice = item.unitPrice;
                        product.quantity = item.quantity;
                        return product
                }
            );

            return products;
        }
    }
    catch (e) {
        console.log('Error occurred:',e);
        return [];
    }
}

export async function getProductById(id, authToken) {
    try{
        const result = await Axios({
            method: 'get',
            url:GET_API+'/'+id,
            headers: {
                'Accept':'application/json',
            }
        });
        if(result.data){


            return result.data;
        }
    }
    catch (e) {
        console.log('Error occurred:',e);
        return [];
    }
}



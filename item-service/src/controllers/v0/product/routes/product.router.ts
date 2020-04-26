import {Router, Response, Request, NextFunction} from 'express';
import {ProductItem} from '../models/ProductItem';
import {getGetSignedUrl, getPutSignedUrl} from '../../../../aws';
import Axios from 'axios';

const router: Router = Router();


export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await Axios({
      method: 'get',
      url: `http://${process.env.USERS_SERVICE}/api/v0/users/auth/verification`,
      headers:
          {
            'Authorization': `${req.headers.authorization}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
      validateStatus: (status) => {
        return status < 600;
      }
    });
    if (result.status !== 200) {
      return res.status(result.status).send(result.data.message);
    }
    return next();
  } catch (e) {
    console.log('error:', e);
    return res.status(500).send({message: e.message});
  }
}
// Health Check endpoint
router.get('/healthz', async (req: Request, res: Response) => {
  console.log('Health Check');
  res.status(200).send('OK');
});

// Retrieve list of all items in the Catalogue
router.get('/', async (request: Request, response: Response) => {

  const items = await ProductItem.findAndCountAll();
  const products = items.rows.map( product => {
    product.imageUrl =  getGetSignedUrl(product.id + '.jpg' as string);
    return product;
  });
  response.status(200).send({
    items: products
  });

});

// Retrieve a Product Item by Id
router.get('/:id', async (request: Request, response: Response) => {
  const {id} = request.params;
  const item = await ProductItem.findByPk(id);
  if (item !== undefined) {
    item.imageUrl = getGetSignedUrl(item.id + '.jpg');
    response.status(200).send(item);
  } else {
    response.status(404).send({
      message: 'Product with given Id not found.'
    });
  }

});

// Delete a product item by ID
router.delete('/:id', requireAuth, async (request: Request, response: Response) => {

  const {id} = request.params;

  const item = await ProductItem.findByPk(id);
  if (!item) {
    response.status(404).send({
      message: 'Product with given Item does not found.'
    });
  }

  await item.destroy();
  response.status(204).send('');

});

// Update a Product Item by Id
router.patch('/:id', requireAuth,async (request: Request, response: Response) => {
  const {id} = request.params;
  const item = await ProductItem.findByPk(id);
  if (!item) {
    response.status(404).send({
      message: 'Product with given Id not found.'
    });
  }
  const name = request.body.name;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const unitPrice = request.body.unitPrice;

  if (name !== undefined) {
    item.name = name;
  }
  if (category !== undefined) {
    item.category = category;
  }
  if (quantity !== undefined) {
    item.quantity = quantity;
  }
  if ( unitPrice !== undefined && !isNaN(parseInt(unitPrice))) {
    item.unitPrice = parseInt(unitPrice);
  }

  const saved_item = await item.save();
  response.status(200).send({
    item: saved_item
  });
});

// Create a new Product Item
router.post('/', requireAuth, async ( request: Request, response: Response) => {

  const name = request.body.name;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const unitPrice = request.body.unitPrice;

  // Validate Request parameters
  if ( !name ) {
    return response.status(400).send({
      message: 'Name is a required field'
    });
  }
  if ( ! quantity ) {
    return response.status(400).send({
      message: 'Quantity is a required field'
    });
  }

  if ( parseInt(quantity) === NaN ) {
    return response.status(400).send({
      message: 'Quantity should be a valid number.'
    });
  }

  if ( ! category ) {
    return response.status(400).send({
      message: 'Category is a required field.'
    });
  }
  if ( ! unitPrice ) {
    return response.status(400).send({
      message: 'Unit Price is a required field.'
    });
  }

  if ( parseInt(unitPrice) === NaN ) {
    return response.status(400).send({
      message: 'Unit Price should be a valid number.'
    });
  }

  const item = await new ProductItem({
    name: name,
    category: category,
    quantity: quantity,
    unitPrice: unitPrice,
    imageUrl: null,
  });

  const saved_item = await item.save();
  saved_item.imageUrl = null;
  response.status(201).send({
    item: saved_item
  });


});



// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth, async (req: Request, res: Response) => {
      const { fileName } = req.params;
      const url = getPutSignedUrl(fileName);
      res.status(201).send({url: url});
    });


export const ProductRouter: Router = router;

import { BSON } from "realm";
export class CartProduct extends Realm.Object<CartProduct>
{
    _id!: BSON.ObjectId;
    name!: string;
    product_image!: string;
    oldprice!:string;
    newprice!:string;
    offerDetails!:string;
    category_id!: string;
    subcategory_id!:string;
    counts!:string;
    owner_id!: string;
    quantity!:number;
    static schema: Realm.ObjectSchema = {
      name: 'CartProduct',
      primaryKey: '_id',
      properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        name: 'string',
        product_image: 'string',
        category_id: 'string',
        subcategory_id: 'string',
        oldprice: 'string',
        newprice: 'string',
        counts:'string',
        owner_id: 'string',
        offerDetails:'string',
        quantity:'int'
      },
    };
}
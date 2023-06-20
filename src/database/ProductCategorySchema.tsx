import { BSON } from "realm";
export class ProductCategory extends Realm.Object<ProductCategory>
{
    _id!: BSON.ObjectId;
    name!: string;
    product_image!: string;
    oldprice!:number;
    newprice!:number;
    offerDetails!:string;
    category_id!: string;
    subcategory_id!:string;
    counts!:string;
    owner_id!: string;
    quantity!:number;
    static schema: Realm.ObjectSchema = {
      name: 'ProductCategory',
      primaryKey: '_id',
      properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        name: 'string',
        product_image: 'string',
        category_id: 'string',
        subcategory_id: 'string',
        oldprice: 'double',
        newprice: 'double',
        counts:'string',
        owner_id: 'string',
        offerDetails:'string',
        quantity:'int'
      },
    };
}
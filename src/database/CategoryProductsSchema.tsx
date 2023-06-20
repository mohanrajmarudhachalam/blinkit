import { BSON } from "realm";
export class CategoryProductsList extends Realm.Object<CategoryProductsList>
{
    _id!: BSON.ObjectId;
    name!:string;
    categoryImage!:string;
    qty!:string;
    newprice!:string;
    oldprice!:string;
    offer!:string;

    static schema: Realm.ObjectSchema={
        name:'CategoryProductsList',
        primaryKey: '_id',
        properties:
        {
            _id: {type: 'objectId', default: () => new BSON.ObjectId()},
            name:'string',
            qty:'string',
            newprice:'string',
            oldprice:'string',
            offer:'string',
        }
    }

}
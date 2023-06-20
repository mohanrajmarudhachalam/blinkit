import { BSON } from "realm";
export class DealsOfDay extends Realm.Object<DealsOfDay>
{
    _id!: BSON.ObjectId;
    name!: string;
    deals_image!: string;
    counts!: string;
    newprice!: string;
    oldprice!: string;
    offerDetails!: string;
    owner_id!: string;
    static schema: Realm.ObjectSchema = {
      name: 'DealsOfDay',
      primaryKey: '_id',
      properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        name: 'string',
        deals_image: 'string',
        oldprice: 'string',
        newprice:'string',
        offerDetails:'string',
        counts:'string',
        owner_id: 'string',
      },
    };
}



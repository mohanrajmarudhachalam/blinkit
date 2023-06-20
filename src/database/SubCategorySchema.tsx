import { BSON } from "realm";
export class Subcategory extends Realm.Object<Subcategory>
{
    _id!: BSON.ObjectId;
    name!: string;
    sub_category_image!: string;
    category_id!: string;
    owner_id!: string;
    static schema: Realm.ObjectSchema = {
      name: 'Subcategory',
      primaryKey: '_id',
      properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        name: 'string',
        sub_category_image: 'string',
        category_id: 'string',
        owner_id: 'string',
      },
    };
}

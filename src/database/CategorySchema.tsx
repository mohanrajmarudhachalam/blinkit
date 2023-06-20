import { BSON } from "realm";

export class Category extends Realm.Object<Category>
{
    _id!: BSON.ObjectId;
    name!: string;
    category_image!: string;
    backcolor!: string;
    owner_id!: string;
    textcolor!: string;
    static schema: Realm.ObjectSchema = {
      name: 'Category',
      primaryKey: '_id',
      properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        name: 'string',
        category_image: 'string',
        backcolor: 'string',
        textcolor:'string',
        owner_id: 'string',
      },
    };
}
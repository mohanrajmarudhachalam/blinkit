import { createRealmContext } from "@realm/react";
import { Category } from "./CategorySchema";
import {DealsOfDay} from "./DealsofDaySchema";
import {Subcategory} from "./SubCategorySchema"
import { ProductCategory } from "./ProductCategorySchema";
import { CartProduct } from "./CartSchema";

export const realmContext =createRealmContext({
    schema: [Category,DealsOfDay,Subcategory,ProductCategory,CartProduct]
})
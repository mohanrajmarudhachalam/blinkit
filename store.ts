import { configureStore} from "@reduxjs/toolkit";
import basketReducer from "./src/redux/basketSlice";
import thunk from 'redux-thunk';
export default configureStore({ 
   reducer:{
     cart:basketReducer
   },
   middleware: [thunk]
})
import { Schema, model } from "mongoose";

new Schema({
    username: {
    type:String,
    required: true,
    min:4,
    lowelcase:true,
    unique:true
},
email: {
    type: String,
    unique:true,
    required:true,
    lowelcase:true

},
password:{
type:String,
required:true
}

})
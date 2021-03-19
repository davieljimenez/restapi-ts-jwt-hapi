import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
export interface IUser extends Document{
    username: string;
    email:string;
    password: string;
    encryptPassword(password:string): Promise<string>;
    // validatePassword(password:string): Promise<boolean>;
}

const userSchema = new Schema({
    username: {
    type:String,
    required: true,
    min:4,
    max:30,
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
min:6,
required:true
}

});

userSchema.methods.encryptPassword = async (password:string):Promise<string> =>{
    const salt =  await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
};

// userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
//     return await bcrypt.compare(password, password);

// };

export default model<IUser> ("User", userSchema);
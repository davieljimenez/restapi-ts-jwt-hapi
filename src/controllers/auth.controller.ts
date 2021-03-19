import { Request, Response } from "express";
import User,{ IUser } from "../models/users.model";
import jwt  from "jsonwebtoken";
import bcrypt, { compare } from "bcryptjs";



export const signup =  async (req:Request, res:Response)=>{
    // Saving a new user
    const user:IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password
    });
    
    user.password =  await user.encryptPassword(user.password)

    const savedUser = await user.save()
    console.log(savedUser);
    
    // Token
    const token: string = jwt.sign({_id:savedUser._id}, process.env.TOKEN_SECRET || "tokentest");
    res.header("auth-token", token).json(savedUser)

    res.send("signup")
};

export const signin = async (req:Request, res:Response)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json("Email or password is wrong");
   
    const correctPassword:boolean = await bcrypt.compare(req.body.password, user.password)
    if(!correctPassword) return res.status(400).json("Invalid Password");
    

    const token:string  = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24 
    })

    res.header("auth-token", token).json(user); 
    
    // userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    //     return await bcrypt.compare(password, password);
    // };

    // const correctPassword:boolean = await user.validatePassword(req.body.password)
    // if(!correctPassword) return res.status(400).json("Invalid Password");
    // res.send("Login")
};

export const profile = async (req:Request, res:Response)=>{
   const user = await User.findById(req.userId, {password: 0});
   if(!user) return res.status(404).json("No user found");
    res.json(user);

};

export const testing = async (req:Request, res:Response) => {
    res.json("Privity")
}
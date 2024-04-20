import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User function
export const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const existingUser = await User.findOne({ username: username })

        if (existingUser) {
            res.status(400).json({
                status: "error",
                message: "Username already exists.",
            })
        } else {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new User({
                name, 
                username,
                password: passwordHash,
            })            

            const saveUser = await newUser.save();
            res.status(201).json(saveUser);
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Login User function
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if(!username || !password) {
            return res.status(400).json({
                status: "error",
                message: "Both username and password are required",
            })
        }

        const user = await User.findOne({ username: username });

        if( !user ) {
            return res.status(400).json({
                status: "error",
                message: "User does not exist."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        // res.cookies.set('token', token,{httpOnly:true}),{status:200,message:"Logged in successfully",user_id: user._id};
        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token,
            user_id: user._id,
        })
        
    } catch (err) {
        res.status(500).json({ error: err.message })        
    }
}


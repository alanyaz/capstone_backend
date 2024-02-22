const { ErrorResponse, SuccessResponse } = require('../utils/responseService');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")


const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!email || email == "" || !password || password == "") {
            return ErrorResponse(res, "Email and Password fields are required !")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return ErrorResponse(res, "Email is already registered !")
        }

        const newUser = new User({ fullName, email: email.toLowerCase(), password: hashedPassword });
        await newUser.save();
        const token = await genJwtToken(newUser._id)

        const { password: passwordd, ...user } = newUser.toObject();

        return SuccessResponse(res, { user, token })
    } catch (error) {
        return ErrorResponse(res, error.message)
    }
}



const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if(!email || email == ""  || !password || password == "" ){
            return ErrorResponse(res,  "Email and Password fields are required !")
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = await genJwtToken(user._id)
            const { password, ...newUser } = user.toObject();
            return SuccessResponse(res, {user : newUser , token})
        } else {
            return ErrorResponse(res, "Invalid Creds !")
        }
    } catch (error) {
        return ErrorResponse(res, error.message)
    }
}




const genJwtToken = async function (id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "29d" })
    return token;
  }
  


module.exports = {
    signup,
    login
}
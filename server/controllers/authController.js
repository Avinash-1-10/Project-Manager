import asyncHanlder from "../utils/asyncHanlder";
import generateToken from "../utils/generateToken";
import setCookies from "../utils/setCookies";

export const login = asyncHanlder(async (req, res) => {
    const {emailOrUsername, password} = req.body;
    if(!emailOrUsername || !password) {
        return res.status(400).json({error: "All fields are required"});
    }
    const existingUser = await User.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]});
    if(!existingUser) {
        return res.status(404).json({error: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch) {
        return res.status(401).json({error: "Invalid credentials"});
    }
    // Generate JWT token
    const token = await generateToken(existingUser._id);

    // set cookies
    setCookies(res, token);

    return res.status(200).json({message: "Login successful"});
})
import bcrypt from "bcryptjs"
import User  from  "../models/user.model.js"



const register = async(req,res)=>{

try {
    
const { name, email, password, confirmPassword } = req.body;

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    //  check user exist or not 
    const existingUser = await User.findOne({email});

     if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
  
    // hash password
    const hashedPassword = await bcrypt.hash(password ,10);

    // user create
    const user = await User.create({
        name,
        email,
        password :hashedPassword
    })
    
     // Never send password back
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };


     return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });

} 

catch (error) {
     console.error("Register error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
}


};

export { register };
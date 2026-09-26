import bcrypt from "bcryptjs"
import User  from  "../models/user.model.js"
import { generateAccessToken,
  generateRefreshToken} from "../utils/token.js"



const register = async(req,res)=>{

try {
const { name, email, password  } = req.body;

    

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


const login = async(req,res)=>{

  try{
  const [email , password] = req.body;

  // finding user through email
  const user = await User.findOnw({email});

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check or comparing password 
       const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );


       if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();


      res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

     return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

      }
       catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }


};










export { register,login };

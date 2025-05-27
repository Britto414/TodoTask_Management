const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

const googleLogin = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        user: name,
        email: email,
        password: "firebase",
      }); // dummy password
    }

    const token = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET_PASSWORD,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(mail);

  if (!email || !password) {
    res.status(404);
    throw new Error("invalid credential");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET_PASSWORD,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({ message: "Login Sccessful", token: accessToken, User: user });
  } else {
    res.status(403);
    throw new Error("No User Found");
  }
});

const RegisterUser = asyncHandler(async (req, res) => {
  const { user, email, password } = req.body;
  console.log(email, password);

  if (!user || !email || !password) {
    res.status(404);
    throw new Error("invalid credential");
  }

  if (!validatePassword(password)) {
    res.status(400);
    throw new Error(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const addedUser = await User.create({
      user,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: addedUser });
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

const CurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ Current_User: req.user });
});

module.exports = {
  googleLogin,
  LoginUser,
  RegisterUser,
  CurrentUser,
};

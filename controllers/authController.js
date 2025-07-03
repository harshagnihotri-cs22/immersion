const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  console.log("sachbhjs")
    console.log(req.body)
    const { firstName ,lastName, email, password } = req.body;

    function generateUsername() {
      
        return `${firstName}.${lastName}`.toLowerCase();
      }
      

      const generateusername = generateUsername();



 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username:generateusername,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "jhv65456", { expiresIn: "1d" });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
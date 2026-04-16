import User from "../models/user.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { name, email, cnic } = req.body;

        const userExists = await User.findOne({ cnic });
        if (userExists) {
            return res.status(400).json({ message: "User with this CNIC already exists" });
        }

        const tempPassword = Math.random().toString(36).slice(-8);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        const newUser = await User.create({
            name,
            email,
            cnic,
            password: hashedPassword,
            isFirstLogin: true,
        });

        const message = `Assalam-o-Alaikum ${name},\n\nYour account has been created for Saylani Qarze Hasana Program.\n\nYour temporary password is: ${tempPassword}\n\nPlease login and change your password.\n\nRegards,\nSaylani Welfare.`;

        try {
            await sendEmail({
                email: newUser.email,
                subject: "Account Password - Saylani Microfinance",
                message,
            });

            res.status(201).json({
                message: "Registration successful. Password sent to email.",
            });
        } catch (err) {
            res.status(500).json({ message: "User registered but email could not be sent." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            isFirstLogin: user.isFirstLogin,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        user.isFirstLogin = false;
        
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
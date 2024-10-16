import express from "express";
import {Request, Response} from 'express';
import User from '../models/user';
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { arrayBuffer } from "stream/consumers";


const router = express.Router();

// /api/users/register
router.post("/register", [
	check("email", "Email is required").isEmail(),
	check("password", "Valid Password is required").isLength({ min: 6}),
	check("firstName", "First Name is required").isString(),
	check("lastName", "Last Name is required").isString(),
	check("base", "Current Base is required").isString(),
	check("unit", "Current Unit is required").isString(),
],
async (req: Request, res: Response) => {
	console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		console.log(errors.array())
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

	  // Generate userID
	  const userCount = await User.countDocuments();
	  const newUserID = userCount+1; //simple incrementing
	  
	  // Creates a new user with a generated userID
      user = new User({
		userID: newUserID,
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		base: req.body.base,
		unit: req.body.unit,
	  });
	  
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
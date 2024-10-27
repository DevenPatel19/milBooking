import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;       // Make optional if not required
  noShowCount?: string; // Make optional if not required
  userID: string;     // Include userID since it's in the schema
  base: string;       // Make sure to include if you want to use it
  unit: string;       // Same as above
};

const userSchema = new mongoose.Schema({
  userID: { type: Number,unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },    // Include in schema
  noShowCount: { type: String, required: false }, // Include in schema
  base: { type: String, required: true },     // Include in schema
  unit: { type: String, required: true },     // Include in schema
});

// Middleware for hashing password before saving to MongoDB
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
	  this.password = await bcrypt.hash(this.password, 8);
	}
	next();
  });

const User = mongoose.model<UserType>("User", userSchema);

export default User;

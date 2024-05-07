const Mongoose = require("mongoose");

const phoneRegex = /^\d{10}$/;
const alphabeticRegex = /^[A-Za-z\s]+$/;

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
    validate: {
      validator: (v) => alphabeticRegex.test(v),
      message: "Name must contain only alphabets",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: (v) => /[0-9]/.test(v) && /[A-Z]/.test(v),
      message:
        "Password must contain at least one number and one uppercase letter",
    },
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of Birth is required"],
    match: [/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"],
  },
  phoneNo: {
    type: String,
    required: [true, "Phone number is required"],
    match: [phoneRegex, "Phone number must be 10 digits (e.g., 9098787898)"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    maxlength: [100, "Address can be at most 100 characters long"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
    maxlength: [50, "City can be at most 50 characters long"],
    validate: {
      validator: (v) => alphabeticRegex.test(v),
      message: "City must contain only alphabetic characters",
    },
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  zipCode: {
    type: String,
    required: [true, "Zip code is required"],
    minlength: [6, "Zip code must be at least 6 characters long"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  question: {
    type: String,
    required: [true, "Security question is required"],
  },
});

module.exports = Mongoose.model("users", userSchema);

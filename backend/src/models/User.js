import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["jobseeker", "employer"],
        required: true
    },
    avatar: {
        type: String,
        default: "",
    },
    resume: {
        type: String,
        default: "",
    },
    // for employer
    companyName: {
        type: String,
        default: "",
    },
    companyDescription: {
        type: String,
        default: "",
    },
    companyLogo: {
        type: String,
        default: "",
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = function (enteredPass) {
    return bcrypt.compare(enteredPass, this.password);
};

export default mongoose.model("User", UserSchema);

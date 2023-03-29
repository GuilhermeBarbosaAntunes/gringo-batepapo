import Mongoose from "mongoose";

export let UserSchema: Mongoose.Schema;
try {
    UserSchema = Mongoose.model("User").schema;
  } catch (error) {
    UserSchema = new Mongoose.Schema(
     {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            default: 0, //0 = admin | 2 = professor | 3 = aluno
        },
        status: {
            type: String,
            required: true,
            default: 1, //o = disabled | 1 = enabled
        },
     },
     { collection: "user", timestamps: true }
    )
}
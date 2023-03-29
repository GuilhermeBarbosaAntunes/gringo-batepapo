import Mongoose from "mongoose";

export let RoomSchema: Mongoose.Schema;
try{
    RoomSchema = Mongoose.model("Room").schema;
} catch (error) {
    RoomSchema = new Mongoose.Schema(
        {
            name: {
                type: String,
                require: true,
            },
            urlImage: {
                type: String,
                require: true
            },
            capacity: {
                type: Number,
                require: true,
                default: 4,
            },
            status: {
                type: Number,
                require: true,
                default: 1,
            },
            level: {
                type: String,
                require: true,
            },
            closedAt: {
                type: Number,
                require: false,
            },
        },
        { collection: "rooms", timestamps: true }
    );
}
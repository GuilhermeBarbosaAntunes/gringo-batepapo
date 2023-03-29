import Mongoose from "mongoose";

export let DossieSchema: Mongoose.Schema;
try {
    DossieSchema = Mongoose.model("Dossie").schema;
} catch (error) {
    DossieSchema = new Mongoose.Schema (
        {
            userId: {
                type: String,
                require: true,
            },
            action: {
                type: String,
                require: true,
            },
            identfier: {
                type: String,
                require: true,
            },
        },
        { collection: "dossie", timestamps: true }
    );
}
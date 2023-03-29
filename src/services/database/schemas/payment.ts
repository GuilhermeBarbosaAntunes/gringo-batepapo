import Mongoose from "mongoose";

export let PaymentSchema: Mongoose.Schema;
try {
    PaymentSchema = Mongoose.model("Payment").schema;
} catch (error) {
    PaymentSchema = new Mongoose.Schema(
        {
            userId: {
                type: String,
                require: true
            },
            amount: {
                type: String,
                require: true,
            },
        },
        { collection: "payment", timestamps: true }
    );
}

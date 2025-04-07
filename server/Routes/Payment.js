const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require("../Model/Payment");
const SignModel = require("../Model/signmodel");

router.post("/checkout", async (req, res) => {
    try {
        const { amount, userid } = req.body;
        const URL = "https://vision-verse.netlify.app";
        const URL1 = "http://localhost:3002";

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Sample Item',
                    },
                    unit_amount: amount * 100, // Convert rupees to paise (Stripe uses the smallest currency unit)
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${URL}/profile/home`, // Redirect to this URL after successful payment
            cancel_url: `${URL}/profile/bill`,
            billing_address_collection: 'required', // Collect billing address
            shipping_address_collection: { allowed_countries: ['IN'] }, // Restrict shipping to India
            metadata: {
                customerName: "Jhon Dev", // Add customer's name
                customerAddress: "1234", // Add customer's address
            },
        });

        const payment = new Payment({
            userid: userid,
            payment_status: 'success',
            payment_time: new Date(),
            amount: amount,
            credit: (amount * 2).toString(), // Calculate credit based on amount
        });

        // Save the payment record
        await payment.save();

        // Update user credit
        if (session.success_url) {
            await SignModel.findByIdAndUpdate(
                userid,
                { $inc: { credit: parseInt(payment.credit) } }, // Increment the credit field by the payment credit
                { new: true }
            );
        }

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/payment/history/:userid", async (req, res) => {
    const { userid } = req.params;
    try {
        console.log(userid);
        const paymentHistory = await Payment.find({ userid });

        return res.status(200).json({ mtype: "success", message: "Successfully found", getuser: paymentHistory });
    } catch (error) {
        console.error("Error fetching user image history:", error);
        return res.status(500).json({ mtype: "fail", message: "Oops! Something went wrong!!!" });
    }
})

module.exports = router;

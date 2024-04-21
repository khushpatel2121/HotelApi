import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/razorpay", async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.Razorpay_KEY_ID,
        key_secret: process.env.Razorpay_KEY_SECRET,
    });
    
    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: req.body.receipt,
    };
    
    try {
        const response = await instance.orders.create(options);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
    }
    });

    router.post('/paymentCapture', (req, res) => {
        // Extract order ID and payment ID from the request body
        const { order_id, razorpay_payment_id } = req.body;
    
        // Concatenate order ID and payment ID separated by a pipe
        const payload = `${order_id}|${razorpay_payment_id}`;
    
        // Generate HMAC SHA256 digest using the secret key
        const hmac = crypto.createHmac('sha256', process.env.Razorpay_KEY_SECRET);
        hmac.update(payload);
        const generated_signature = hmac.digest('hex');
    
        // Compare generated signature with the signature sent by Razorpay
        if (generated_signature === req.headers['x-razorpay-signature']) {
            // Payment is successful
            console.log('Payment is successful');
            res.json({
                status: 'ok'
            });
        } else {
            // Signature mismatch, payment is not valid
            console.log('Invalid signature');
            res.status(400).send('Invalid signature');
        }
    });

    router.post("/validate", async (req, res) => {
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
          // Concatenate order_id and razorpay_payment_id separated by "|"
          const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
      
          // Create a SHA256 HMAC with the RAZORPAY_SECRET
          const sha = crypto.createHmac("sha256", process.env.Razorpay_KEY_SECRET);
          sha.update(payload);
          const digest = sha.digest("hex");
      
          // Compare the calculated signature with the received signature
          if (digest === razorpay_signature) {
            // Signature is valid, send success response
            return res.json({ msg: "success", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
          } else {
            // Signature is invalid, send error response
            return res.status(400).json({ msg: "Transaction is not legit!" });
          }
        } catch (error) {
          // Handle any errors
          console.error("Error:", error);
          return res.status(500).json({ msg: "Internal Server Error" });
        }
      });

    export default router;
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/payment-notify", async (req, res) => {
  const paymentData = req.body;

  // Verify the payment data with PayFast (implement this function)
  if (verifyPayment(paymentData)) {
    const userEmail = paymentData.email_address;

    // Send an email using MailerLite
    try {
      await axios.post(
        "https://connect.mailerlite.com/api/subscribers",
        {
          email: userEmail,
          fields: {
            transactionId: paymentData.transaction_id,
            amount: paymentData.amount,
          },
          groups: ["128641737161704712"], // Group ID
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZmMxNTA4ZjYyNjg2NTYwZGVkODBlOGIxZjYxMzY1NTc5ZWQ3NTJmMDYyYjI4NzA5NzlhNDVkMzY3MTNiZGM1Nzc2OWZjNzdmMDhjZjE2ZTIiLCJpYXQiOjE3MjI5NjU4MTguMjg2ODA2LCJuYmYiOjE3MjI5NjU4MTguMjg2ODA3LCJleHAiOjQ4Nzg2Mzk0MTguMjg0MzY0LCJzdWIiOiIxMDU4MDM5Iiwic2NvcGVzIjpbXX0.C7f3Ees3buuF7Kz348u_psytcUspR2nUoAkj1E2Lnw5OoSs-YFvn0sPtzhIty13s8wKZ7uAxP4CjgYWvDlxyfIL-UZg91bdJykkSi8q2B0DAqMPHKfa5oy4ACQZbTTTxQUfAvgrqWwF-02ORpGeFrG8-rSNzKiK7ItkYbbxZpjawj9XjwXWkk6so1tFD-0AlaaQyekKRNYk9DEerx9EzdGv0w6ckn2IjYc5DcnP9DXZDKRm9LA0VwVJNNFMjV3Jr-n236I7z2GJ7Yc6kLzot_Vg_QahnSYkAvslt7iTeh6GBJBaRtRLhb5HOVeM3sQIR-KfELew5_Qs8PtmAWFmJFYnF5aCVXMyELQTtmANyI5E_cOElmw7rcYJIiyaxUxCIXewsUCCmvsI2a07P4t_saqK7uYD1Cv0b_nsQeI9Qllt_-bDjzSbZKNACcL4tivIh_daaURZ2bucXnCeObePwDfEkjyv-_i_VAyc-194njCTEdJfhp4tFP2ktr4sOeznk8KtNEYj3mZ0naGtdF2yq6tZaisVccDz7W1TL-wD4mPsGF_hE6v4ZXwCSJX_p5BWlVyTNJzy1Vv4xSv-wdDMsmVTwt0-P9iSECNUgLqkHRdU2oqOi1wAlryH26pFsYhvmJHaTtxgtUZJlEcibLaE5On11DQwZ1HIX0GK0XJW9A5U",
          },
        }
      );

      res.status(200).send("IPN processed and email sent.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email.");
    }
  } else {
    res.status(400).send("Payment verification failed.");
  }
});

async function verifyPayment(paymentData) {
  try {
    // PayFast verification URL
    const payFastVerifyUrl = "https://payment.payfast.co.za/eng/query/validate";

    // Data to send to PayFast for verification
    const params = new URLSearchParams();
    params.append("merchant_id", paymentData.merchant_id);
    params.append("merchant_key", paymentData.merchant_key);
    params.append("transaction_id", paymentData.transaction_id);
    params.append("amount", paymentData.amount);

    // Send a request to PayFast to verify the payment
    const response = await axios.post(payFastVerifyUrl, params);

    // Check PayFast's response to determine if the payment is valid
    if (response.data.status === "success") {
      return true;
    } else {
      console.error("Payment verification failed:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

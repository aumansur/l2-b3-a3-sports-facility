import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.services";

const paymentIntend = catchAsync(async (req, res) => {
  const { price } = req.body;

  // Check if price is valid
  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({
      message: "Invalid price",
    });
  }

  try {
    const result = await PaymentServices.createPaymentIntend(price);

    // Send back the clientSecret to the frontend
    res.status(200).json({
      clientSecret: result.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment setup failed. Please try again later.",
      error: error,
    });
  }
});

export const PaymentController = {
  paymentIntend,
};

import stripe from "./payment.const";

const createPaymentIntend = async (price: number) => {
  try {
    const priceAmount = Math.round(price * 100); // Convert dollars to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceAmount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Payment intent creation failed");
  }
};

export const PaymentServices = {
  createPaymentIntend,
};

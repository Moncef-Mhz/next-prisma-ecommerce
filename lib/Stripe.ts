// import Stripe from "stripe";

// export async function CreateOrder(orderDetails:any) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: "2022-11-15",
//   });

//   // Create a PaymentIntent
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: orderDetails.total * 100, // Amount in cents
//     currency: "usd",
//     automatic_payment_methods: { enabled: true },
//   });

//   // Save order details and paymentIntent.client_secret in the database
//   return paymentIntent.client_secret;
// }

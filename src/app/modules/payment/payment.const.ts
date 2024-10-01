import Stripe from "stripe";

const stripe = new Stripe(
  "pk_test_51NGG3MLgaxGVZfWQ9trb9G70qmemTAYXnPSUq95W9o8EZCJ9uOYBSOZ43HoxSUmPIILMaEWKRa7HY7O70MvlC7O800hihmqtOx" as string
);

export default stripe;

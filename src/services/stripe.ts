import packageInfo from "../../package.json";
import Stripe from "stripe";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
  appInfo: {
    name: "YKnews",
    version: packageInfo.version,
  },
});

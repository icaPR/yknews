import * as prismic from "@prismicio/client";

export function getPrismicClient() {
  {
    access_token: process.env.PRISMIC_ACCESS_TOKEN;
  }
  const endpoint = prismic.getEndpoint("YKnews");

  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return client;
}

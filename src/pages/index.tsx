import styles from "./home.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}
export default function Home(product: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | YKNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>😁 Olá, Bem-vindo</span>
          <h1>
            Notícias sobre o mundo do <span>React</span>.
          </h1>
          <p>
            Tenha acesso a todas as publicações
            <br /> <span>por {product.product.amount} mês</span>
            <SubscribeButton priceId={product.product.priceId} />
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Human coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1Ls0Q9DgIRNNSji0ZJAnWu4u");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

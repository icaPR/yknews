import styles from "./home.module.scss";
import Head from "next/head";
import { Header } from "../components/Header";

export default function Home() {
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
            Tenha acesso a todas as publicações por
            <br /> <span>R$ 9,90 mês</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Human coding" />
      </main>
    </>
  );
}

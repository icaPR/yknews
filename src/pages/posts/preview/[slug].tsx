import { GetStaticProps } from "next";
import { getPrismicClient } from "../../../services/prismic";
import { RichText } from "prismic-dom";
import styles from "../post.module.scss";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface PropsPostPrevie {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  };
}

export default function PostPreview({ post }: PropsPostPrevie) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | YKnews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <div className={styles.continueReading}>
          Quer continuar lendo ?
          <Link href="/">
            <a href="">Inscreva-se 😃</a>
          </Link>
        </div>
      </main>
    </>
  );
}
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID("publication", String(slug));

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };
  return {
    props: {
      post,
    },
    redirect: 60 * 30,
  };
};

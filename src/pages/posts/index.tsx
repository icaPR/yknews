import * as prismic from "@prismicio/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
secret: process.env.NEXTAUTH_SECRET;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
};
interface PropsPosts {
  posts: Post[];
}

export default function Posts({ posts }: PropsPosts) {
  return (
    <>
      <Head>
        <title>Posts | YKnews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a key={post.slug} href="#">
              <time>{post.updateAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const response = await client.get({
    predicates: prismic.predicate.at("document.type", "publication"),
  });
  console.log(response);

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updateAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });
  return {
    props: {
      posts,
    },
  };
};

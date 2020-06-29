import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";

import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

import { getSortedPosts, AllPosts } from "../lib/posts";

export default function Home(props) {
  const { allPosts }: { allPosts: AllPosts[] } = props;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hello, I&apos;m Han Chiang, a Singapore-based software engineer.</p>
        <p>
          I take pride in designing and building systems that are scalable and
          maintainable.
        </p>
        <p>
          You can reach me at{" "}
          <a target="_blank" href="https://www.linkedin.com/in/yap-han-chiang/">
            LinkedIn
          </a>
          .
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getSortedPosts();
  return {
    props: {
      allPosts,
    },
  };
};

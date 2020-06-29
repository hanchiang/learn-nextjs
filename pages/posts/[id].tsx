import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

import { getAllPostIds, getPost } from "../../lib/posts";

import { Post } from "../../lib/posts";

export default function DynamicPost(props) {
  const { post }: { post: Post } = props;
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // any paths not returned by getStaticPaths will result in a 404 page.
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.id as string);
  return {
    props: {
      post,
    },
  };
};

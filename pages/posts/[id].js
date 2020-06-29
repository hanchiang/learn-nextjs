import Head from 'next/head'

import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import { getAllPostIds, getPost } from '../../lib/posts'

export default function Post(props) {
  const { post } = props;
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
  )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false // any paths not returned by getStaticPaths will result in a 404 page.
    }
}

export async function getStaticProps({ params }) {
    const post = await getPost(params.id);
    return {
      props: {
        post
      }
    }
}
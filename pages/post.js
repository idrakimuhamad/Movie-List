  import Layout from '../components/layout'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'

const Post = (props) => (
  <Layout>
    <h1>{ props.show.name }</h1>
    <p>{ props.show.summary.replace(/<[/]?p>/g, '') }</p>
    <img src={ props.show.image.medium } alt={ props.show.name }/>
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched: ${show.name}`);

  return { show }
}

export default Post

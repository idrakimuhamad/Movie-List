import Layout from '../components/layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.show.id}`} href={`/post?id=${props.show.id}`}>
      <a>{ props.show.name }</a>
    </Link>
    <style jsx>{`
      a {
        font-family: "sans-serif";
        text-decoration: none;
        color: rgba(0,0,0, .6);
      }
      a:hover {
        opacity: .6;
      }
      li {
        list-style-type: none;
        padding: .5rem;
      }
    `}</style>
  </li>
)

const Index = (props) => (
  <Layout>
    <h1>TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <PostLink key={ show.id } show={ show } />
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "sans-serif";
      }
      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Data count: ${ data.length }`);

  return {
    shows: data
  }
}

export default Index

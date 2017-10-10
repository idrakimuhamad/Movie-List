import Layout from '../components/layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.show.id}`} href={`/post?id=${props.show.id}`}>
      <a className="blue">{ props.show.name }</a>
    </Link>
    <style jsx>{`
      a {
        font-family: "sans-serif";
        text-decoration: none;
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
    <div>
      { props.error  ? (
        <div className="pa1">
          <p className="red">{`There's a problem in retrieving the movie list. Please try again later.`}</p>
        </div>
      ) : (
        <div className="movie-list">
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
        </div>
      )}
    </div>
  </Layout>
)

Index.getInitialProps = async function() {
  try {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Data count: ${ data.length }`);

    return {
      shows: data,
      error: false
    }
  } catch (e) {
    console.error('Error');
    console.error(e);

    return {
      shows: null,
      error: true
    }
  }


}

export default Index

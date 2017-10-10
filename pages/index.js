import Layout from '../components/layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
    <img className="w2 h2 w3-ns h3-ns br-100" src={props.show.image.medium} />
    <div className="pl3 flex-auto">
      <Link as={`/p/${props.show.id}`} href={`/post?id=${props.show.id}`}>
        <a className="f6 link blue hover-dark-gray db">{props.show.name}</a>
      </Link>
      <span className="f6 db black-70">{props.show.premiered}</span>
    </div>
    <div>
      <span href="tel:" className="f6">{props.show.rating.average ? props.show.rating.average : `Not Available`}</span>
    </div>

  </li>
)

const Index = (props) => (
  <Layout>
    <div className="pl0 mt0 measure center">
      <h1>Batman</h1>
      <div>
        { props.error  ? (
          <div className="pa1">
            <p className="red">{`There's a problem in retrieving the movie list. Please try again later.`}</p>
          </div>
        ) : (
          <div className="movie-list">
            <ul className="list pl0 mt0 measure center">
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

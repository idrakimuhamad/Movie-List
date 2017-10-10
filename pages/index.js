import { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'

const PostLink = (props) => (
  <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
    <img className="w2 h2 w3-ns h3-ns br-100" src={props.show.image ? props.show.image.medium : null} />
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

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shows: props.shows || [],
      error: props.error || false,
      query: props.query || 'batman'
    }
    this.onSearchInputChange = this.onSearchInputChange.bind(this)
  }

  static async getInitialProps () {
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=batman`)
      const data = await res.json()

      console.log(`Data count: ${ data.length }`);

      return {
        shows: data,
        error: false,
        query: 'batman'
      }
    } catch (e) {
      console.error('Error');
      console.error(e);

      return {
        shows: null,
        error: true,
        query: 'batman'
      }
    }
  }

  onSearchInputChange = (e) => {
    this.debounce && clearTimeout(this.debounce)

    let value = e.target.value;
    this.debounce = setTimeout(() => {
      this.searchMovie(value)
    }, 300)
  }

  searchMovie = (title) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${title}`)
    .then(response => response.json())
    .then(response => {
      console.log(`Data count: ${ response.length }`);

      this.setState({
        query: title,
        shows: response,
        error: false
      })
    })
    .catch(e => {
      console.error('Error');
      console.error(e);

      this.setState({
        query: title,
        shows: [],
        error: true
      })
    })
  }

  render() {
    return (
      <Layout>
        <div className="pl0 mt0 measure center">
          <div>
            <form className="pa4 black-80">
              <div className="measure">
                <label htmlFor="name" className="f6 tc b db mb2">Search</label>
                <input
                  id="name"
                  className="input-reset ba b--black-20 pa2 mb2 db w-100"
                  type="text"
                  aria-describedby="name-desc"
                  onChange={this.onSearchInputChange} />
                <small id="name-desc" className="f6 tc black-60 db mb2">Look up with movie name or related <keywords></keywords></small>
              </div>
            </form>
          </div>
          <h1>Results for {this.state.query}</h1>
          <div>
            { this.state.error  ? (
              <div className="pa1">
                <p className="red">{`There's a problem in retrieving the movie list. Please try again later.`}</p>
              </div>
            ) : (
              <div className="movie-list">
                <ul className="list pl0 mt0 measure center">
                  {this.state.shows.map(({ show }) => (
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
  }
}

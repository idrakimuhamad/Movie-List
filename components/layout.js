import { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Header from './header'
import Loader from './loader'
import stylesheet from 'styles/index.scss'

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentWillMount() {
    // show loading
    Router.onRouteChangeStart = (url) => {
      console.log(`Loading ${url}`);
      this.setState({
        isLoading: true
      })
    }
    Router.onRouteChangeComplete = () => {
      this.setState({
        isLoading: false
      })
    }
    Router.onRouteChangeError = () =>{
      this.setState({
        isLoading: false
      })}
  }

  render() {
    return (
      <div className="sans-serif">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <Header />
        { this.state.isLoading ? ( <div className="measure center relative pv5"><Loader /></div> ): this.props.children }
      </div>
    )
  }
}
